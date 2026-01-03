import { StyleSheet, Platform, Dimensions } from 'react-native';

const PRIMARY_COLOR = '#14ba82';
const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CHART_WIDTH = SCREEN_WIDTH - 80;
const CHART_HEIGHT = 200;
const PADDING_LEFT = 40;
const PADDING_RIGHT = 20;
const PADDING_TOP = 20;
const PADDING_BOTTOM = 30;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingTop: 60,
    paddingBottom: 100,
    paddingHorizontal: 20,
  },
  content: {
    width: '100%',
    gap: 24,
  },
  headerSection: {
    width: '100%',
    gap: 8,
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: '800',
    letterSpacing: -0.8,
    paddingHorizontal: 4,
    lineHeight: 40,
  },
  yearSelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 16,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 16,
  },
  yearSelectorText: {
    fontSize: 18,
    fontWeight: '600',
  },
  yearButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceChartContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 20,
    flexDirection: 'column',
    gap: 12,
    position: 'relative',
  },
  balanceChartTitle: {
    fontSize: 16,
    fontWeight: '500',
    letterSpacing: 0.3,
    textTransform: 'none',
    marginLeft: 0,
    paddingLeft: 0,
  },
  chartContainer: {
    width: '100%',
    padding: 20,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  chartTitle: {
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 0.3,
    marginBottom: 8,
  },
  chartSubtitle: {
    fontSize: 14,
    fontWeight: '400',
    marginBottom: 20,
  },
  balanceChartHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
    paddingHorizontal: 0,
  },
  balanceGrowthIndicator: {
    fontSize: 14,
    fontWeight: '600',
    color: '#14ba82',
    marginLeft: 'auto',
  },
  lineChartContainer: {
    width: '100%',
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
  },
  chartStyle: {
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: 'transparent',
  },
  monthLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  monthLabelsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: CHART_WIDTH,
    paddingHorizontal: 16,
    marginTop: 8,
  },
  monthLabelChart: {
    fontSize: 12,
    fontWeight: '500',
    flex: 1,
    textAlign: 'center',
  },
  monthlyBars: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    height: 180,
    paddingHorizontal: 8,
    marginTop: 20,
  },
  barContainer: {
    flex: 1,
    alignItems: 'center',
    gap: 8,
  },
  bars: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 2,
  },
  bar: {
    width: '48%',
    minHeight: 4,
    borderRadius: 4,
  },
  entradaBar: {
    backgroundColor: PRIMARY_COLOR,
  },
  saidaBar: {
    backgroundColor: '#ff4444',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 24,
    marginTop: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  legendDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  entradaDot: {
    backgroundColor: PRIMARY_COLOR,
  },
  saidaDot: {
    backgroundColor: '#ff4444',
  },
  legendText: {
    fontSize: 12,
    fontWeight: '500',
  },
  bestMonthInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0, 0, 0, 0.08)',
  },
  bestMonthText: {
    fontSize: 14,
    fontWeight: '500',
  },
  categoryList: {
    width: '100%',
    marginTop: 20,
  },
  categoryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
  },
  categoryItemLast: {
    borderBottomWidth: 0,
  },
  categoryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  categoryDot: {
    width: 16,
    height: 16,
    borderRadius: 8,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '500',
  },
  categoryValue: {
    fontSize: 16,
    fontWeight: '600',
  },
  comparisonSection: {
    width: '100%',
  },
  comparisonTitle: {
    marginBottom: 16,
  },
  comparisonGrid: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
  },
  comparisonCard: {
    flex: 1,
    minWidth: '30%',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    gap: 8,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 8,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  comparisonLabel: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  comparisonValue: {
    fontSize: 18,
    fontWeight: '700',
    textAlign: 'center',
  },
  insightsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  insightCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.05,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  insightText: {
    flex: 1,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
});
