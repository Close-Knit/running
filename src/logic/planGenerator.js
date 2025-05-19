// src/logic/planGenerator.js

/**
 * Generates a periodization plan based on the target date and current fitness level
 *
 * @param {string} targetDateString - The target race date in ISO format
 * @param {number|string} currentFitnessLevel - Current weekly mileage as a proxy for fitness
 * @returns {Object} Periodization plan with base, intensity, taper phases and total weeks
 */
function generatePeriodization(targetDateString, currentFitnessLevel) {
  const targetDate = new Date(targetDateString);
  const now = new Date();
  // Calculate total weeks available
  const totalWeeks = Math.floor((targetDate.getTime() - now.getTime()) / (7 * 24 * 60 * 60 * 1000));

  if (totalWeeks < 4) { // Minimum plan length, e.g., 4 weeks
    // Handle too short duration: maybe return an error or a very basic, fixed plan
    console.warn("Target date is too soon for standard periodization. Adjusting to a minimum plan length.");
    // For now, let's default to a short plan structure if too few weeks
    return {
      base: Math.max(1, Math.floor(totalWeeks * 0.5)),
      intensity: Math.max(1, Math.floor(totalWeeks * 0.3)),
      taper: Math.max(1, Math.floor(totalWeeks * 0.2)),
      totalWeeks: Math.max(4, totalWeeks)
    };
  }

  // Original logic, ensure it distributes whole weeks and sums to totalWeeks
  // Ensure baseWeeks calculation is robust.
  // Example: const baseBuildingProportion = 0.5; // 50% of time for base
  // Let's refine the proportions to be clearer and adaptable
  const baseProportion = 0.6;
  const intensityProportion = 0.3;
  const taperProportion = 0.1;

  let baseWeeks = Math.round(totalWeeks * baseProportion);
  let intensityWeeks = Math.round(totalWeeks * intensityProportion);
  let taperWeeks = Math.round(totalWeeks * taperProportion);

  // Adjust to ensure sum equals totalWeeks, prioritizing taper and base
  if (baseWeeks + intensityWeeks + taperWeeks !== totalWeeks) {
    // Simple adjustment, can be more sophisticated
    intensityWeeks = totalWeeks - baseWeeks - taperWeeks;
    if (intensityWeeks < 0) { // if taper + base > total
        baseWeeks = Math.max(1, totalWeeks - taperWeeks - 1); // ensure intensity has at least 1 week if possible
        intensityWeeks = Math.max(1, totalWeeks - baseWeeks - taperWeeks);
    }
  }

  // Ensure minimums for each phase if totalWeeks allows
  if (totalWeeks >= 8) { // Example threshold for full periodization
    baseWeeks = Math.max(4, baseWeeks); // Min 4 weeks base
    intensityWeeks = Math.max(2, intensityWeeks); // Min 2 weeks intensity
    taperWeeks = Math.max(1, Math.min(3, taperWeeks)); // Taper usually 1-3 weeks

    // Re-adjust if minimums push sum over totalWeeks
    let currentSum = baseWeeks + intensityWeeks + taperWeeks;
    if (currentSum > totalWeeks) {
        let diff = currentSum - totalWeeks;
        // reduce from longest phase first, e.g. base, then intensity
        if (baseWeeks - diff >= 1) baseWeeks -= diff;
        else if (intensityWeeks - (diff - (currentSum - totalWeeks - baseWeeks + 1)) >= 1) {
          intensityWeeks -= (diff - (currentSum - totalWeeks - baseWeeks + 1));
        }
    }

    // Final check to ensure sum matches totalWeeks
    intensityWeeks = totalWeeks - baseWeeks - taperWeeks;
  }

  return {
    base: baseWeeks,
    intensity: intensityWeeks,
    taper: taperWeeks,
    totalWeeks: totalWeeks
  };
}

/**
 * Determines the training phase for a given week
 *
 * @param {number} weekNumber - The current week number
 * @param {Object} periodization - The periodization plan
 * @returns {string} The phase name ('base', 'intensity', or 'taper')
 */
function determinePhase(weekNumber, periodization) {
  if (weekNumber <= periodization.base) return 'base';
  if (weekNumber <= periodization.base + periodization.intensity) return 'intensity';
  return 'taper';
}

/**
 * Generates a weekly schedule based on periodization and user preferences
 *
 * @param {Object} periodization - The periodization plan
 * @param {Object} formData - User form data
 * @returns {Array} Array of weekly schedule objects
 */
function generateWeeklySchedule(periodization, formData) {
  const weeklySchedule = [];

  // Ensure availableDays is an array and has valid values
  let availableDays = [];
  if (formData.lifestyle && Array.isArray(formData.lifestyle.availableDays) && formData.lifestyle.availableDays.length > 0) {
    availableDays = [...formData.lifestyle.availableDays]; // Create a copy to avoid modifying the original
  } else {
    // Default to 3 days per week if none selected
    console.warn("No available days selected or invalid format, defaulting to Monday, Wednesday, Saturday");
    availableDays = ["Monday", "Wednesday", "Saturday"];
  }

  const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  // Debug: Log available days at the start of function
  console.log("AVAILABLE DAYS IN GENERATOR:", availableDays);
  console.log("AVAILABLE DAYS TYPE:", typeof availableDays, Array.isArray(availableDays));

  let currentLongRunDuration = 60; // Placeholder, base this on current mileage / experience later
  if (formData.trainingHistory.currentWeeklyMileage) {
      // Very rough estimate for initial long run based on weekly mileage
      // e.g. if they run 30km/week, maybe long run is 10km (convert to time based on avg pace later)
      // For now, let's use a simpler progression.
      const mileage = parseFloat(formData.trainingHistory.currentWeeklyMileage);
      if (mileage <= 20) currentLongRunDuration = 45; // km or miles, adjust units later
      else if (mileage <= 40) currentLongRunDuration = 60;
      else currentLongRunDuration = 75;
  }

  for (let i = 1; i <= periodization.totalWeeks; i++) {
    const phase = determinePhase(i, periodization);
    const weekData = {
      week: i,
      phase: phase,
      // Initialize all days to REST
      Monday: "REST", Tuesday: "REST", Wednesday: "REST", Thursday: "REST",
      Friday: "REST", Saturday: "REST", Sunday: "REST"
    };

    let workoutCount = 0;
    console.log(`Week ${i}, Phase: ${phase}, Processing available days:`, availableDays);

    // First, handle the long run assignment (prioritize Saturday or Sunday)
    const hasLongRunDay = availableDays.some(day => day === 'Saturday' || day === 'Sunday');

    // Process each available day
    availableDays.forEach(day => {
      console.log(`  Processing day: ${day}, Current workoutCount: ${workoutCount}`);

      // Verify day is a valid property name
      if (!daysOfWeek.includes(day)) {
        console.error(`Invalid day name: ${day}`);
        return; // Skip this iteration
      }

      // Assign workouts based on phase
      if (phase === 'base') {
        // Long run assignment (weekend priority)
        if (day === 'Saturday' || (day === 'Sunday' && !availableDays.includes('Saturday'))) {
          weekData[day] = `Long Run: ${currentLongRunDuration} minutes`;
          console.log(`    Assigned Long Run to ${day}`);
        }
        // Quality workout (speed work)
        else if (workoutCount === 0 && (day === 'Tuesday' || day === 'Wednesday')) {
          weekData[day] = "Fartlek: 6x1 min fast, 2 min jog";
          workoutCount++;
          console.log(`    Assigned Fartlek to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Easy runs
        else if (workoutCount < 3) { // Allow up to 3 easy runs
          weekData[day] = "30-45 min Easy Run";
          workoutCount++;
          console.log(`    Assigned Easy Run to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Recovery/cross-training for additional days
        else {
          weekData[day] = "Cross-Training or Recovery";
          console.log(`    Assigned Cross-Training to ${day}`);
        }
      }
      else if (phase === 'intensity') {
        // Long run assignment (weekend priority)
        if (day === 'Saturday' || (day === 'Sunday' && !availableDays.includes('Saturday'))) {
          weekData[day] = `Long Run: ${currentLongRunDuration * 0.9}-${currentLongRunDuration} minutes`;
          console.log(`    Assigned Long Run to ${day}`);
        }
        // Interval workout (early week)
        else if (workoutCount === 0 && (day === 'Tuesday' || day === 'Wednesday')) {
          weekData[day] = "Intervals: 5x800m @ Target Race Pace";
          workoutCount++;
          console.log(`    Assigned Intervals to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Tempo workout (mid-week)
        else if (workoutCount === 1 && (day === 'Thursday' || day === 'Friday')) {
          weekData[day] = "Tempo Run: 20-30 minutes @ Threshold";
          workoutCount++;
          console.log(`    Assigned Tempo Run to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Easy runs
        else if (workoutCount < 4) { // Allow up to 4 runs in intensity phase
          weekData[day] = "30-40 min Easy Run";
          workoutCount++;
          console.log(`    Assigned Easy Run to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Recovery/cross-training for additional days
        else {
          weekData[day] = "Cross-Training or Recovery";
          console.log(`    Assigned Cross-Training to ${day}`);
        }
      }
      else { // Taper phase
        // Long run assignment (weekend priority, but shorter)
        if (day === 'Saturday' || (day === 'Sunday' && !availableDays.includes('Saturday'))) {
          weekData[day] = `Long Run: ${Math.max(30, currentLongRunDuration * 0.5)} minutes (shorter)`;
          console.log(`    Assigned Taper Long Run to ${day}`);
        }
        // Quality workout (maintain some intensity)
        else if (workoutCount === 0 && (day === 'Tuesday' || day === 'Wednesday')) {
          weekData[day] = "Short Intervals: 4x400m @ Race Pace";
          workoutCount++;
          console.log(`    Assigned Short Intervals to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Easy runs (reduced volume)
        else if (workoutCount < 3) {
          weekData[day] = "20-30 min Easy Run";
          workoutCount++;
          console.log(`    Assigned Taper Easy Run to ${day}, workoutCount now: ${workoutCount}`);
        }
        // Rest or very light activity
        else {
          weekData[day] = "Rest or 15-20 min Very Easy Jog";
          console.log(`    Assigned Rest/Easy Jog to ${day}`);
        }
      }
    });

    console.log(`Week ${i} final schedule:`, weekData);

    weeklySchedule.push(weekData);

    // Basic Long Run Progression for next week (only in base, then hold/reduce)
    if (phase === 'base' && i < periodization.base) {
      currentLongRunDuration = Math.min(180, Math.floor(currentLongRunDuration * 1.1)); // Max 3 hours, 10% increase
    }
  }
  return weeklySchedule;
}

/**
 * Generates a complete running plan based on user form data
 *
 * @param {Object} formData - User form data from all steps
 * @returns {Object} Complete running plan with summary, periodization, and weekly schedule
 */
export function generateRunningPlan(formData) {
  // Debug: Log the entire form data
  console.log("FULL FORM DATA IN PLAN GENERATOR:", JSON.stringify(formData, null, 2));

  // Basic validation for targetDate
  if (!formData.goalConfig.targetDate) {
    // Handle error: perhaps return a specific error object or throw
    console.error("Target date is required to generate a plan.");
    // For now, returning a structure indicating failure
    return { error: "Target date is required." };
  }

  const periodization = generatePeriodization(
    formData.goalConfig.targetDate,
    formData.trainingHistory.currentWeeklyMileage
  );

  if (periodization.totalWeeks < 4 && !formData.goalConfig.targetDate) {
    // This check might be redundant if generatePeriodization handles it robustly
    console.warn("Plan duration is very short. Consider selecting a target date further in the future.");
  }

  const weeklySchedule = generateWeeklySchedule(periodization, formData);

  return {
    summary: `Your ${formData.goalConfig.raceType || 'Running'} Plan towards ${new Date(formData.goalConfig.targetDate).toLocaleDateString()}`,
    periodization: periodization,
    weeklySchedule: weeklySchedule,
    rawInputs: formData
  };
}
