// src/components/pdf/PlanPDFDocument.jsx
import React from 'react';
import { Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer';

// Create styles
const styles = StyleSheet.create({
  page: {
    paddingTop: 35,
    paddingBottom: 65,
    paddingHorizontal: 35,
    fontFamily: 'Helvetica', // Default font
  },
  header: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    color: '#32CD32', // Bright green to match site theme
  },
  logo: {
    width: 100,
    height: 'auto',
    marginBottom: 10,
    alignSelf: 'center', // Center the logo
  },
  sectionTitle: {
    fontSize: 14,
    marginTop: 15,
    marginBottom: 5,
    fontWeight: 'bold',
    textDecoration: 'underline',
    color: '#32CD32',
  },
  weekHeader: {
    fontSize: 12,
    marginTop: 10,
    marginBottom: 3,
    fontWeight: 'bold',
  },
  dayWorkout: {
    fontSize: 10,
    marginLeft: 10,
    marginBottom: 2,
  },
  text: {
    margin: 12,
    fontSize: 14,
    textAlign: 'justify',
  },
  footer: {
    position: 'absolute',
    fontSize: 10,
    bottom: 30,
    left: 0,
    right: 0,
    textAlign: 'center',
    color: 'grey',
  },
  table: {
    display: "table",
    width: "auto",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginBottom: 10,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableColHeader: {
    width: "12.5%", // 8 columns (Week + 7 days)
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    backgroundColor: '#f0f0f0',
    padding: 3,
    textAlign: 'center',
    fontSize: 9,
    fontWeight: 'bold',
  },
  tableCol: {
    width: "12.5%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 3,
    fontSize: 8,
  },
  phaseBox: {
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  phaseTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  phaseValue: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#32CD32',
  },
  phasesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  disclaimer: {
    fontSize: 8,
    marginTop: 20,
    fontStyle: 'italic',
    color: 'grey',
  }
});

// Logo path - using the logo-glow.webp file from the public directory
const logoUrl = '/logo-glow.webp';

/**
 * PDF Document component for rendering a running plan as a PDF
 *
 * @param {Object} props - Component props
 * @param {Object} props.planData - The plan data object
 * @returns {JSX.Element} The PDF document component
 */
const PlanPDFDocument = ({ planData }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Logo and Header */}
      <Image src={logoUrl} style={styles.logo} />
      <Text style={styles.header}>Alt.Run Training Plan</Text>
      <Text style={{ fontSize: 16, textAlign: 'center', marginBottom: 10 }}>
        {planData.summary || 'Your Personalized Running Plan'}
      </Text>

      {/* Periodization Overview */}
      <Text style={styles.sectionTitle}>Periodization Overview</Text>
      <View style={styles.phasesContainer}>
        <View style={[styles.phaseBox, { width: '30%' }]}>
          <Text style={styles.phaseTitle}>Base Building</Text>
          <Text style={styles.phaseValue}>
            {planData.periodization.base} {Number(planData.periodization.base) === 1 ? 'week' : 'weeks'}
          </Text>
        </View>
        <View style={[styles.phaseBox, { width: '30%' }]}>
          <Text style={styles.phaseTitle}>Intensity Focus</Text>
          <Text style={styles.phaseValue}>
            {planData.periodization.intensity} {Number(planData.periodization.intensity) === 1 ? 'week' : 'weeks'}
          </Text>
        </View>
        <View style={[styles.phaseBox, { width: '30%' }]}>
          <Text style={styles.phaseTitle}>Taper</Text>
          <Text style={styles.phaseValue}>
            {planData.periodization.taper} {Number(planData.periodization.taper) === 1 ? 'week' : 'weeks'}
          </Text>
        </View>
      </View>
      <Text style={{ fontSize: 10, marginBottom: 10 }}>
        Total Plan Duration: {planData.periodization.totalWeeks} {Number(planData.periodization.totalWeeks) === 1 ? 'week' : 'weeks'}
      </Text>

      {/* Weekly Schedule */}
      <Text style={styles.sectionTitle}>Weekly Schedule</Text>

      <View style={styles.table}>
        {/* Table Header */}
        <View style={styles.tableRow}>
          <View style={styles.tableColHeader}><Text>Week</Text></View>
          <View style={styles.tableColHeader}><Text>Mon</Text></View>
          <View style={styles.tableColHeader}><Text>Tue</Text></View>
          <View style={styles.tableColHeader}><Text>Wed</Text></View>
          <View style={styles.tableColHeader}><Text>Thu</Text></View>
          <View style={styles.tableColHeader}><Text>Fri</Text></View>
          <View style={styles.tableColHeader}><Text>Sat</Text></View>
          <View style={styles.tableColHeader}><Text>Sun</Text></View>
        </View>

        {/* Table Rows */}
        {planData.weeklySchedule && planData.weeklySchedule.map((week, index) => (
          <View style={styles.tableRow} key={index}>
            <View style={styles.tableCol}>
              <Text>{week.week} ({week.phase})</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Monday || 'REST'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Tuesday || 'REST'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Wednesday || 'REST'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Thursday || 'REST'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Friday || 'REST'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Saturday || 'REST'}</Text>
            </View>
            <View style={styles.tableCol}>
              <Text>{week.Sunday || 'REST'}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Disclaimer */}
      <View style={styles.disclaimer}>
        <Text>
          Important Disclaimer: This plan is generated based on the information you provided and is intended as a general guide only.
          Always consult with a healthcare professional before starting any new exercise program, especially if you have any health concerns or conditions.
          Listen to your body and adjust the plan as needed.
        </Text>
      </View>

      {/* Footer */}
      <Text style={styles.footer}>
        Generated by Alt.Run on {new Date().toLocaleDateString()}
      </Text>
    </Page>
  </Document>
);

export default PlanPDFDocument;
