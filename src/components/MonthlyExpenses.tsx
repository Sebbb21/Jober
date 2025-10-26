import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface MonthlyDataPoint {
  month: string;
  value: number;
}

interface MonthlyExpensesProps {
  title: string;
  data: MonthlyDataPoint[];
  years: string[];
  months: string[];
}

export default function MonthlyExpenses({ title, data, years, months }: MonthlyExpensesProps) {
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedMonth, setSelectedMonth] = useState('Tous');
  const [showYearPicker, setShowYearPicker] = useState(false);
  const [showMonthPicker, setShowMonthPicker] = useState(false);
  const [selectedBar, setSelectedBar] = useState<{ month: string; value: number } | null>(null);

  return (
    <View style={styles.sectionCard}>
      <Text style={styles.sectionTitle}>{title}</Text>

      {/* Year and Month Picker */}
      <View style={styles.pickersContainer}>
        <View style={styles.pickerWrapper}>
          <TouchableOpacity 
            style={styles.filterDropdown}
            onPress={() => {
              setShowMonthPicker(false);
              setShowYearPicker(!showYearPicker);
            }}
          >
            <Text style={styles.filterText}>{selectedYear}</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>

          {showYearPicker && (
            <View style={styles.pickerDropdown}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={true}
                style={{ maxHeight: 180 }}
              >
                {years.map((year) => (
                  <TouchableOpacity
                    key={year}
                    style={styles.pickerItem}
                    onPress={() => {
                      setSelectedYear(year);
                      setShowYearPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{year}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>

        <View style={styles.pickerWrapper}>
          <TouchableOpacity 
            style={styles.filterDropdown}
            onPress={() => {
              setShowYearPicker(false);
              setShowMonthPicker(!showMonthPicker);
            }}
          >
            <Text style={styles.filterText}>{selectedMonth}</Text>
            <Ionicons name="chevron-down" size={16} color="#6B7280" />
          </TouchableOpacity>

          {showMonthPicker && (
            <View style={styles.pickerDropdown}>
              <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={true}
                style={{ maxHeight: 180 }}
              >
                {months.map((month) => (
                  <TouchableOpacity
                    key={month}
                    style={styles.pickerItem}
                    onPress={() => {
                      setSelectedMonth(month);
                      setShowMonthPicker(false);
                    }}
                  >
                    <Text style={styles.pickerItemText}>{month}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          )}
        </View>
      </View>

      {/* Bar Chart */}
      <View style={styles.chartWrapper}>
        {/* Y-axis labels */}
        <View style={styles.yAxisLabels}>
          <Text style={styles.yAxisText}>5000€</Text>
          <Text style={styles.yAxisText}>4000€</Text>
          <Text style={styles.yAxisText}>3000€</Text>
          <Text style={styles.yAxisText}>2000€</Text>
          <Text style={styles.yAxisText}>1000€</Text>
          <Text style={styles.yAxisText}>0€</Text>
        </View>

        {/* Scrollable Chart */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.chartScrollView}
        >
          <View style={styles.chartContainer}>
            {data.map((dataPoint) => {
              const percentage = (dataPoint.value / 5000) * 100;
              const isSelected = selectedBar?.month === dataPoint.month;
              
              return (
                <TouchableOpacity
                  key={dataPoint.month}
                  style={styles.barColumn}
                  onPress={() => setSelectedBar(isSelected ? null : dataPoint)}
                >
                  <View style={styles.bar}>
                    <View style={[styles.barFill, { height: `${percentage}%` }]} />
                  </View>
                  <Text style={styles.barLabel}>{dataPoint.month}</Text>
                  {isSelected && (
                    <View style={styles.tooltip}>
                      <Text style={styles.tooltipText}>{dataPoint.month}</Text>
                      <Text style={styles.tooltipValue}>{dataPoint.value}€</Text>
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginHorizontal: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 20,
  },
  pickersContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 12,
    marginBottom: 16,
  },
  pickerWrapper: {
    position: 'relative',
  },
  filterDropdown: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#F9FAFB',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    minWidth: 100,
  },
  filterText: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  pickerDropdown: {
    position: 'absolute',
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    zIndex: 1000,
    overflow: 'hidden',
    maxHeight: 200,
  },
  pickerItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  pickerItemText: {
    fontSize: 14,
    color: '#111827',
  },
  chartWrapper: {
    flexDirection: 'row',
    height: 200,
    marginLeft: 3,
    marginRight: 3,
    marginBottom: 3,
  },
  yAxisLabels: {
    width: 40,
    justifyContent: 'space-between',
    paddingTop: 3,
    paddingBottom: 20,
    zIndex: 10,
  },
  yAxisText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'right',
  },
  chartScrollView: {
    flex: 1,
    marginLeft: 5,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: '100%',
    paddingTop: 3,
    paddingBottom: 3,
    paddingRight: 3,
    marginLeft: 7,
    minWidth: 600,
  },
  barColumn: {
    alignItems: 'center',
    marginHorizontal: 0,
    flex: 1,
    maxWidth: 65,
    position: 'relative',
  },
  bar: {
    width: 38,
    height: 170,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  barFill: {
    width: '100%',
    backgroundColor: '#8B5CF6',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    minHeight: 4,
  },
  barLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  tooltip: {
    position: 'absolute',
    top: 20,
    backgroundColor: '#1F2937',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    minWidth: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1001,
  },
  tooltipText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  tooltipValue: {
    fontSize: 11,
    color: '#D1D5DB',
  },
});

