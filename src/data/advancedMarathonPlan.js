// src/data/advancedMarathonPlan.js

const advancedMarathonPlan = {
  title: "18-Week Elite Development Marathon Plan Framework",
  goal: "To achieve peak marathon performance, targeting significant personal bests or competitive outcomes.",
  targetAudience: "Highly experienced advanced runners with multiple years of consistent high-volume training (e.g., consistently 60-70+ miles per week as a base), experience with structured periodization, and a strong understanding of their body's response to training.",
  prerequisites: "Recent history of high mileage, multiple marathon completions, and injury resilience. This plan is demanding and assumes a high level of commitment.",
  phases: [
    {
      name: "Block 1: Accumulation (Aerobic Base & Volume Build-up) - Weeks 1-6",
      description: "Maximize aerobic capacity, build musculoskeletal tolerance to high volume, enhance fat oxidation, and lay the groundwork for more intense training. Significant volume of Zone 1-2 running, with foundational specific work.",
      weeks: [
        {
          weekNumber: 1,
          subtitle: "e.g., 70-80 miles",
          days: [
            {
              day: "Monday",
              workoutFocus: "Easy Aerobic Run",
              workoutDetails: "(Optional) Very Easy Recovery Run or XT (30-40min)",
              targetDuration: "8-10",
              intensityNotes: "Zone 1-2 / RPE 3-4"
            },
            {
              day: "Tuesday",
              workoutFocus: "General Aerobic + Strides: 60-75 min easy",
              workoutDetails: "Strength Training (Foundation)",
              targetDuration: "8-10 + Strides",
              intensityNotes: "Zone 2; Strides @ ~5K-10K effort"
            },
            {
              day: "Wednesday",
              workoutFocus: "Moderate Long Run: 90-100 min steady",
              workoutDetails: "(Optional) Very Easy Recovery Run (30 min)",
              targetDuration: "12-14",
              intensityNotes: "Zone 2 / RPE 4"
            },
            {
              day: "Thursday",
              workoutFocus: "Easy Aerobic + Hills/Form: 60 min easy run with 6-8x short hill sprints",
              workoutDetails: "Core & Mobility",
              targetDuration: "7-9",
              intensityNotes: "Zone 2; Hills @ hard effort"
            },
            {
              day: "Friday",
              workoutFocus: "Very Easy Recovery Run or Rest",
              workoutDetails: "Rest or very light XT",
              targetDuration: "4-6 (or 0)",
              intensityNotes: "Zone 1 / RPE 2"
            },
            {
              day: "Saturday",
              workoutFocus: "Long Run: 2:00-2:15 hrs, mostly easy",
              workoutDetails: "Rest",
              targetDuration: "16-18",
              intensityNotes: "Zone 2, conversational"
            },
            {
              day: "Sunday",
              workoutFocus: "Easy Aerobic Run",
              workoutDetails: "(Optional) Very Easy Recovery Run",
              targetDuration: "8-10",
              intensityNotes: "Zone 1-2 / RPE 3"
            }
          ]
        },
        {
          weekNumber: "2-5",
          note: "Gradually increase total weekly volume by 5-10% each week. Long run increases by 1-2 miles. Increase duration of easy/moderate runs. Introduce one session of longer intervals or tempo work towards end of this sub-phase, e.g., Week 4-5: WU; 8-10x1K @ 10K-HM pace w/ 2-3 min jog; CD. PM runs can be added or extended gradually for volume.",
          days: [
            {
              day: "Weekly Structure",
              workoutFocus: "Progressive Build",
              workoutDetails: "Maintain mostly Z1-2 running with 1-2 quality sessions per week",
              targetDuration: "Varies",
              intensityNotes: "Maintain mostly Z1-2, specific workout Z3-4"
            }
          ]
        },
        {
          weekNumber: 6,
          subtitle: "Deload/Adaptation",
          note: "Reduce total weekly volume by ~20-25%. Maintain 1-2 quality sessions but with reduced volume within them. Reduce PM runs.",
          days: [
            {
              day: "Weekly Focus",
              workoutFocus: "Recovery Week",
              workoutDetails: "Maintain structure but reduce volume",
              targetDuration: "~70-80",
              intensityNotes: "Focus on recovery, main quality still Z3-4"
            }
          ]
        }
      ]
    },
    {
      name: "Block 2: Transmutation (Race-Specific Endurance & Lactate Threshold Development) - Weeks 7-12",
      description: "Converting aerobic base into ability to sustain faster paces for longer; improving lactate clearance and VO2 max. Volume may stabilize or slightly decrease from peak accumulation, but intensity of key workouts increases significantly.",
      weeks: [
        {
          weekNumber: 7,
          subtitle: "e.g., 90-100 miles",
          days: [
            {
              day: "Monday",
              workoutFocus: "Easy Aerobic Run",
              workoutDetails: "(Optional) Very Easy Recovery Run or XT (30-40min)",
              targetDuration: "8-10",
              intensityNotes: "Zone 1-2 / RPE 3-4"
            },
            {
              day: "Tuesday",
              workoutFocus: "VO2 Max Intervals: WU; 5-6x1200m @ 3K-5K pace w/ 800m jog recovery; CD",
              workoutDetails: "Easy Recovery Run (30-40 min)",
              targetDuration: "10-12",
              intensityNotes: "Reps @ Zone 5 / RPE 9"
            },
            {
              day: "Wednesday",
              workoutFocus: "Moderate Aerobic Run + Strides",
              workoutDetails: "Strength Training (Max Strength/Power)",
              targetDuration: "10-12 + Strides",
              intensityNotes: "Zone 2; Strides faster"
            },
            {
              day: "Thursday",
              workoutFocus: "Lactate Threshold: WU; 6-8 miles @ LT2 pace (HM pace to 10K pace); CD",
              workoutDetails: "(Optional) Very Easy Recovery Run (30 min)",
              targetDuration: "10-12",
              intensityNotes: "Tempo @ Zone 4 / RPE 7-8"
            },
            {
              day: "Friday",
              workoutFocus: "Very Easy Recovery Run or Rest",
              workoutDetails: "Rest or very light XT",
              targetDuration: "4-6 (or 0)",
              intensityNotes: "Zone 1 / RPE 2"
            },
            {
              day: "Saturday",
              workoutFocus: "Long Run with MP Segments: 20-22 miles total: e.g., 10 miles easy, then 2x3 miles @ Goal MP w/ 1 mile easy recovery, finish easy",
              workoutDetails: "Rest",
              targetDuration: "20-22",
              intensityNotes: "MP Segments @ Zone 3-4 / RPE 6-7"
            },
            {
              day: "Sunday",
              workoutFocus: "Easy Aerobic Run",
              workoutDetails: "(Optional) Very Easy Recovery Run",
              targetDuration: "8-10",
              intensityNotes: "Zone 1-2 / RPE 3"
            }
          ]
        },
        {
          weekNumber: "8-11",
          note: "Continue similar structure. Key workouts evolve: LT runs might become longer cruise intervals (e.g., 3x2 miles @ LT2). VO2 Max work might vary rep length/recovery. Long runs incorporate larger chunks at MP or slightly faster. Manage overall weekly volume carefully, may hold steady or slightly undulate. PM runs support volume and recovery.",
          days: [
            {
              day: "Weekly Structure",
              workoutFocus: "Progressive Intensity",
              workoutDetails: "Maintain volume while increasing workout specificity and intensity",
              targetDuration: "Varies",
              intensityNotes: "Key workouts remain high intensity"
            }
          ]
        },
        {
          weekNumber: 12,
          subtitle: "Deload/Adaptation",
          note: "Reduce total weekly volume by ~20-25%. One key LT workout, one shorter fast interval session. Shorter long run. Reduce PM runs.",
          days: [
            {
              day: "Weekly Focus",
              workoutFocus: "Recovery Week",
              workoutDetails: "Maintain structure but reduce volume",
              targetDuration: "~70-80",
              intensityNotes: "Quality efforts, focus on feeling good"
            }
          ]
        }
      ]
    },
    {
      name: "Block 3: Realization (Race Specificity, Sharpening & Taper) - Weeks 13-18",
      description: "Final race-specific preparation, maximizing freshness and readiness while maintaining fitness. Significant reduction in volume, maintaining or slightly increasing intensity of very specific workouts.",
      weeks: [
        {
          weekNumber: 13,
          subtitle: "e.g., 75-85 miles (Begin taper, more MP work)",
          days: [
            {
              day: "Monday",
              workoutFocus: "Easy Aerobic Run",
              workoutDetails: "(Optional) Very Easy Recovery Run or XT",
              targetDuration: "7-9",
              intensityNotes: "Zone 1-2"
            },
            {
              day: "Tuesday",
              workoutFocus: "Race Specific Intervals: WU; 3x2 miles @ Goal MP w/ 800m jog recovery; CD",
              workoutDetails: "Easy Recovery Run (30 min)",
              targetDuration: "10-11",
              intensityNotes: "Reps @ Zone 3-4 / RPE 6-7 (Race Effort)"
            },
            {
              day: "Wednesday",
              workoutFocus: "Moderate Aerobic Run",
              workoutDetails: "Strength Training (Maintenance/Power, low volume)",
              targetDuration: "8-10",
              intensityNotes: "Zone 2"
            },
            {
              day: "Thursday",
              workoutFocus: "Short, Fast Intervals: WU; 8-10x400m @ 5K pace or faster w/ full rec; CD",
              workoutDetails: "(Optional) Very Easy Recovery Run (20-30 min)",
              targetDuration: "6-7",
              intensityNotes: "Reps @ Zone 5 / RPE 9 (Feeling sharp)"
            },
            {
              day: "Friday",
              workoutFocus: "Very Easy Recovery Run or Rest",
              workoutDetails: "Rest",
              targetDuration: "3-5 (or 0)",
              intensityNotes: "Zone 1"
            },
            {
              day: "Saturday",
              workoutFocus: "Final Longish Run: 12-14 miles, with 5-6 miles @ Goal MP in middle",
              workoutDetails: "Rest",
              targetDuration: "12-14",
              intensityNotes: "MP segment @ Zone 3-4 / RPE 6-7"
            },
            {
              day: "Sunday",
              workoutFocus: "Easy Aerobic Run",
              workoutDetails: "Rest",
              targetDuration: "6-8",
              intensityNotes: "Zone 1-2"
            }
          ]
        },
        {
          weekNumber: "14-16",
          subtitle: "Taper Continues",
          note: "Further reduce weekly volume each week (e.g., Week 14: ~60-70 mi; Wk 15: ~50-60 mi; Wk 16: ~40-50 mi). Maintain 1-2 short, high-quality workouts. Example: Wk 15 Tue: WU; 4x800m @ 10K pace; CD. Sat: 8 miles easy w/ 2 miles @ MP. Significantly reduce or cut PM runs.",
          days: [
            {
              day: "Weekly Focus",
              workoutFocus: "Progressive Taper",
              workoutDetails: "Reduce volume while maintaining workout quality",
              targetDuration: "Decreasing",
              intensityNotes: "Quality over quantity, feeling fresh"
            }
          ]
        },
        {
          weekNumber: 17,
          subtitle: "Race Week - ~25-35 miles excl. race",
          days: [
            {
              day: "Monday",
              workoutFocus: "Rest or Very Light XT (20-30 min)",
              workoutDetails: "Rest",
              targetDuration: "0-3 (XT)",
              intensityNotes: "Recovery"
            },
            {
              day: "Tuesday",
              workoutFocus: "Very Easy Run + Short Strides: 3-4 miles total, 4x100m strides",
              workoutDetails: "Rest",
              targetDuration: "3-4",
              intensityNotes: "Zone 1; Strides light & quick"
            },
            {
              day: "Wednesday",
              workoutFocus: "Rest",
              workoutDetails: "Rest",
              targetDuration: "0",
              intensityNotes: "Full Recovery"
            },
            {
              day: "Thursday",
              workoutFocus: "Very Short Shakeout: 2 miles extremely easy, 2-3 x 100m gentle strides",
              workoutDetails: "Rest",
              targetDuration: "2",
              intensityNotes: "Zone 1, feeling good"
            },
            {
              day: "Friday",
              workoutFocus: "Rest",
              workoutDetails: "Travel / Pre-race prep",
              targetDuration: "0",
              intensityNotes: "Mental Prep"
            },
            {
              day: "Saturday",
              workoutFocus: "(Optional) Very short 10-15 min jog/strides",
              workoutDetails: "Rest",
              targetDuration: "1-2 (opt)",
              intensityNotes: "Loosen up"
            }
          ]
        },
        {
          weekNumber: 18,
          days: [
            {
              day: "Sunday",
              workoutFocus: "MARATHON RACE DAY!",
              workoutDetails: "Post-Race Recovery Protocol",
              targetDuration: "26.2 + WU/CD",
              intensityNotes: "Execute Race Plan!"
            }
          ]
        }
      ]
    }
  ]
};

export default advancedMarathonPlan;
