import { useState, useEffect, useRef } from "react";
import { Calendar, Clock, TrendingUp, DollarSign, Target, Wallet, ArrowRight, LineChart, ChevronDown, HelpCircle, Home, Receipt, Maximize2, Minimize2 } from "lucide-react";
import Chart from 'react-apexcharts';
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import DailyTip from "@/components/dashboard/DailyTip";
import FlashcardPreview from "@/components/dashboard/FlashcardPreview";
import StreaksPointsTable from "@/components/dashboard/StreaksPointsTable";
import TransactionList from "@/components/dashboard/TransactionList";
import BudgetOverview from "@/components/dashboard/BudgetOverview";

// Mock data for different timeframes
const weeklyData = {
  categories: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
  series: [
    {
      name: 'Portfolio',
      data: [1057500, 1068750, 1072500, 1061250, 1078500, 1089000, 1087500]
    },
    {
      name: 'Savings',
      data: [600000, 603750, 607500, 611250, 613500, 614250, 615000]
    },
    {
      name: 'Investments',
      data: [390000, 393750, 397500, 403500, 406500, 408750, 412500]
    }
  ]
};

const monthlyData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  series: [
    {
      name: 'Portfolio',
      data: [787500, 840000, 885000, 937500, 982500, 1087500]
    },
    {
      name: 'Savings',
      data: [390000, 435000, 480000, 525000, 570000, 615000]
    },
    {
      name: 'Investments',
      data: [157500, 187500, 240000, 285000, 315000, 412500]
    }
  ]
};

const yearlyData = {
  categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  series: [
    {
      name: 'Portfolio',
      data: [675000, 735000, 765000, 795000, 832500, 862500, 915000, 960000, 1005000, 1042500, 1065000, 1087500]
    },
    {
      name: 'Savings',
      data: [300000, 330000, 360000, 390000, 420000, 450000, 480000, 510000, 540000, 570000, 592500, 615000]
    },
    {
      name: 'Investments',
      data: [90000, 112500, 135000, 157500, 180000, 210000, 240000, 270000, 300000, 337500, 375000, 412500]
    }
  ]
};

// Update currency formatter
const currencyFormatter = (val) => `₹${val.toLocaleString('en-IN')}`;

// Base chart options
const baseChartOptions = {
  chart: {
    id: 'investment-chart',
    toolbar: {
      show: true,
      autoSelected: 'zoom',
      tools: {
        download: true,
        selection: true,
        zoom: true,
        zoomin: true,
        zoomout: true,
        pan: true,
        reset: true
      },
      export: {
        svg: {
          filename: 'financial-chart-svg',
        },
        png: {
          filename: 'financial-chart-png',
        }
      },
      style: {
        fontSize: '14px',
        fontFamily: 'inherit',
        color: '#555',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
      }
    },
    animations: {
      enabled: true,
      easing: 'easeinout',
      speed: 800
    },
    fontFamily: 'inherit',
    background: 'transparent',
    sparkline: {
      enabled: false
    }
  },
  colors: ['#3b82f6', '#8b5cf6', '#10b981'],
  fill: {
    type: 'gradient',
    gradient: {
      shade: 'dark',
      type: 'vertical',
      opacityFrom: 0.9,
      opacityTo: 0.5,
      stops: [0, 90, 100],
      colorStops: []
    }
  },
  stroke: {
    curve: 'smooth',
    width: 3
  },
  grid: {
    borderColor: '#f1f1f1',
    strokeDashArray: 4,
    yaxis: {
      lines: {
        show: true
      }
    },
    padding: {
      top: 10,
      right: 10,
      bottom: 0,
      left: 10
    }
  },
  markers: {
    size: 4,
    strokeWidth: 2,
    hover: {
      size: 6
    }
  },
  dataLabels: {
    enabled: false
  },
  legend: {
    position: 'top',
    horizontalAlign: 'right',
    offsetY: -5,
    fontSize: '13px',
    fontWeight: 500,
    markers: {
      width: 12,
      height: 12,
      radius: 6
    },
    itemMargin: {
      horizontal: 15,
      vertical: 5
    },
    onItemClick: {
      toggleDataSeries: true
    },
    onItemHover: {
      highlightDataSeries: true
    }
  },
  tooltip: {
    theme: 'light',
    shared: true,
    intersect: false,
    y: {
      formatter: currencyFormatter
    }
  },
  xaxis: {
    categories: weeklyData.categories,
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '12px',
        fontFamily: 'inherit'
      }
    },
    axisBorder: {
      show: false
    },
    axisTicks: {
      show: false
    }
  },
  yaxis: {
    labels: {
      style: {
        colors: '#64748b',
        fontSize: '12px',
        fontFamily: 'inherit'
      },
      formatter: currencyFormatter
    }
  },
  states: {
    hover: {
      filter: {
        type: 'lighten',
        value: 0.04
      }
    },
    active: {
      filter: {
        type: 'darken',
        value: 0.88
      }
    }
  }
};

// Dashboard component
const Dashboard = ({ theme, toggleTheme }) => {
  const [timeframe, setTimeframe] = useState('week');
  const [chartOptions, setChartOptions] = useState(baseChartOptions);
  const [chartSeries, setChartSeries] = useState(weeklyData.series);
  const [chartType, setChartType] = useState('area');
  const [chartKey, setChartKey] = useState(1);
  const [isChartLoading, setIsChartLoading] = useState(true);
  const [isChartFullscreen, setIsChartFullscreen] = useState(false);
  const chartRef = useRef(null);
  const chartContainerRef = useRef(null);
  
  // Add effect to simulate data loading
  useEffect(() => {
    setIsChartLoading(true);
    const timer = setTimeout(() => {
      setIsChartLoading(false);
    }, 800);
    
    return () => clearTimeout(timer);
  }, [timeframe, chartType]);

  // Handle resize events for chart responsiveness
  useEffect(() => {
    const handleResize = () => {
      if (chartRef.current && chartRef.current.chart) {
        setTimeout(() => {
          try {
            chartRef.current.chart.render();
          } catch (err) {
            console.log('Chart render error:', err);
          }
        }, 300);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle timeframe change
  const handleTimeframeChange = (value) => {
    setTimeframe(value);
    
    let data;
    switch(value) {
      case 'week':
        data = weeklyData;
        break;
      case 'month':
        data = monthlyData;
        break;
      case 'year':
        data = yearlyData;
        break;
      default:
        data = weeklyData;
    }
    
    setChartSeries(data.series);
    setChartOptions(prevOptions => ({
      ...prevOptions,
      xaxis: {
        ...prevOptions.xaxis,
        categories: data.categories
      }
    }));
  };
  
  // Handle chart type change
  const handleChartTypeChange = (type) => {
    setChartType(type);
    // Force chart to re-render completely
    setChartKey(prevKey => prevKey + 1);
  };
  
  // Update chart theme based on app theme
  useEffect(() => {
    if (theme === 'dark') {
      setChartOptions(prev => ({
        ...prev,
        theme: { mode: 'dark' },
        chart: {
          ...prev.chart,
          toolbar: {
            ...prev.chart.toolbar,
            style: {
              ...prev.chart.toolbar.style,
              backgroundColor: 'rgba(30, 41, 59, 0.8)',
              color: '#cbd5e1',
            }
          }
        },
        grid: {
          ...prev.grid,
          borderColor: '#374151',
        },
        tooltip: {
          ...prev.tooltip,
          theme: 'dark'
        },
        xaxis: {
          ...prev.xaxis,
          labels: {
            ...prev.xaxis.labels,
            style: {
              ...prev.xaxis.labels.style,
              colors: '#9ca3af'
            }
          }
        },
        yaxis: {
          ...prev.yaxis,
          labels: {
            ...prev.yaxis.labels,
            style: {
              ...prev.yaxis.labels.style,
              colors: '#9ca3af'
            }
          }
        }
      }));
    } else {
      setChartOptions(prev => ({
        ...prev,
        theme: { mode: 'light' },
        chart: {
          ...prev.chart,
          toolbar: {
            ...prev.chart.toolbar,
            style: {
              ...prev.chart.toolbar.style,
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              color: '#555',
            }
          }
        },
        grid: {
          ...prev.grid,
          borderColor: '#f1f1f1',
        },
        tooltip: {
          ...prev.tooltip,
          theme: 'light'
        },
        xaxis: {
          ...prev.xaxis,
          labels: {
            ...prev.xaxis.labels,
            style: {
              ...prev.xaxis.labels.style,
              colors: '#64748b'
            }
          }
        },
        yaxis: {
          ...prev.yaxis,
          labels: {
            ...prev.yaxis.labels,
            style: {
              ...prev.yaxis.labels.style,
              colors: '#64748b'
            }
          }
        }
      }));
    }
    
    // Force chart to re-render when theme changes
    setChartKey(prevKey => prevKey + 1);
  }, [theme]);

  // Handle fullscreen toggle
  const toggleChartFullscreen = () => {
    if (!chartContainerRef.current) return;
    
    if (!isChartFullscreen) {
      if (chartContainerRef.current.requestFullscreen) {
        chartContainerRef.current.requestFullscreen();
      } else if (chartContainerRef.current.mozRequestFullScreen) {
        chartContainerRef.current.mozRequestFullScreen();
      } else if (chartContainerRef.current.webkitRequestFullscreen) {
        chartContainerRef.current.webkitRequestFullscreen();
      } else if (chartContainerRef.current.msRequestFullscreen) {
        chartContainerRef.current.msRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    }
    
    setIsChartFullscreen(!isChartFullscreen);
  };

  // Monitor fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsChartFullscreen(
        document.fullscreenElement || 
        document.mozFullScreenElement || 
        document.webkitFullscreenElement || 
        document.msFullscreenElement
      );
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('mozfullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);

    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('mozfullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

  return (
    <DashboardLayout theme={theme} toggleTheme={toggleTheme}>
      <div className="max-w-7xl mx-auto animate-fade-in">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
          <h1 className="text-2xl font-medium">Financial Dashboard</h1>
          
          <div className="flex items-center mt-3 sm:mt-0">
            <div className="text-sm text-muted-foreground mr-4 flex items-center">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span>Last updated: </span>
              <span className="font-medium ml-1">Today, 10:45 AM</span>
            </div>
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="h-4 w-4 mr-2" />
              <span>June 2023</span>
            </Button>
          </div>
        </div>
        
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-br from-primary/10 to-primary/5 shadow-sm border border-primary/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-primary/80 mb-1">Current Balance</p>
                  <h3 className="text-2xl font-semibold">₹10,87,500</h3>
                  <p className="text-xs text-muted-foreground mt-1">+₹1,50,000 from last month</p>
                </div>
                <div className="h-14 w-14 bg-primary/20 rounded-full flex items-center justify-center shrink-0 ml-2">
                  <Wallet className="h-7 w-7 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className={cn(
            "transition-all duration-300",
            theme === 'dark' 
              ? "bg-gradient-to-br from-accent/40 to-accent/20 shadow-[0_0_30px_rgba(var(--accent),0.5)] border-2 border-accent/50 hover:shadow-[0_0_40px_rgba(var(--accent),0.7)]"
              : "bg-gradient-to-br from-accent/10 to-accent/5 shadow-sm border border-accent/20 hover:shadow-[0_0_15px_rgba(var(--accent),0.3)]"
          )}>
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className={cn(
                    "text-sm font-medium mb-1",
                    theme === 'dark' ? "text-accent" : "text-accent/80"
                  )}>Monthly Savings</p>
                  <h3 className={cn(
                    "text-2xl font-semibold",
                    theme === 'dark' 
                      ? "text-accent drop-shadow-[0_0_15px_rgba(var(--accent),0.8)]"
                      : "text-accent"
                  )}>₹2,58,750</h3>
                  <p className={cn(
                    "text-xs mt-1",
                    theme === 'dark' ? "text-accent/90" : "text-muted-foreground"
                  )}>+22% from last month</p>
                </div>
                <div className={cn(
                  "h-14 w-14 rounded-full flex items-center justify-center shrink-0 ml-2",
                  theme === 'dark'
                    ? "bg-accent/50 ring-2 ring-accent/70 shadow-[0_0_25px_rgba(var(--accent),0.6)]"
                    : "bg-accent/20"
                )}>
                  <span className={cn(
                    "text-2xl font-bold",
                    theme === 'dark'
                      ? "text-accent drop-shadow-[0_0_15px_rgba(var(--accent),0.8)]"
                      : "text-accent"
                  )}>₹</span>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-orange-500/10 to-orange-500/5 shadow-sm border border-orange-500/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-orange-500/80 mb-1">Knowledge Score</p>
                  <h3 className="text-2xl font-semibold">835 pts</h3>
                  <p className="text-xs text-muted-foreground mt-1">Advanced level</p>
                </div>
                <div className="h-14 w-14 bg-orange-500/20 rounded-full flex items-center justify-center shrink-0 ml-2">
                  <Target className="h-7 w-7 text-orange-500" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-500/10 to-emerald-500/5 shadow-sm border border-emerald-500/20">
            <CardContent className="p-4">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-sm font-medium text-emerald-500/80 mb-1">Investment Growth</p>
                  <h3 className="text-2xl font-semibold">+12.5%</h3>
                  <p className="text-xs text-muted-foreground mt-1">Year to date</p>
                </div>
                <div className="h-14 w-14 bg-emerald-500/20 rounded-full flex items-center justify-center shrink-0 ml-2">
                  <TrendingUp className="h-7 w-7 text-emerald-500" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main financial chart */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="pb-2 flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-2 sm:space-y-0">
              <div className="flex items-center space-x-3">
                <CardTitle className="flex items-center">
                  <LineChart className="h-5 w-5 text-primary mr-2 inline-block" />
                  <span>Financial Overview</span>
                </CardTitle>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8 bg-secondary/40 rounded-full">
                      <HelpCircle className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="start" className="w-80">
                    <div className="space-y-2">
                      <h4 className="font-medium text-sm">About this chart</h4>
                      <p className="text-xs text-muted-foreground">
                        This chart shows the growth of your financial assets over time.
                        Portfolio is your total assets, which includes both savings and investments.
                      </p>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
              <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
                <Button 
                  variant="outline" 
                  size="icon"
                  className="h-9 w-9 border-dashed hidden sm:flex"
                  onClick={toggleChartFullscreen}
                  title={isChartFullscreen ? "Exit fullscreen" : "View fullscreen"}
                >
                  {isChartFullscreen ? 
                    <Minimize2 className="h-4 w-4" /> : 
                    <Maximize2 className="h-4 w-4" />
                  }
                </Button>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="flex justify-between w-full sm:w-auto px-3">
                      <span className="mr-2">{chartType === 'area' ? 'Area' : chartType === 'line' ? 'Line' : 'Bar'} Chart</span>
                      <ChevronDown className="h-4 w-4 ml-1" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent align="end" className="w-[160px] p-0">
                    <div className="p-1">
                      <Button 
                        variant={chartType === 'area' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className="w-full justify-start text-left font-normal"
                        onClick={() => handleChartTypeChange('area')}
                      >
                        Area Chart
                      </Button>
                      <Button 
                        variant={chartType === 'line' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className="w-full justify-start text-left font-normal"
                        onClick={() => handleChartTypeChange('line')}
                      >
                        Line Chart
                      </Button>
                      <Button 
                        variant={chartType === 'bar' ? 'secondary' : 'ghost'} 
                        size="sm" 
                        className="w-full justify-start text-left font-normal"
                        onClick={() => handleChartTypeChange('bar')}
                      >
                        Bar Chart
                      </Button>
                    </div>
                  </PopoverContent>
                </Popover>
                <Tabs defaultValue={timeframe} value={timeframe} onValueChange={handleTimeframeChange} className="w-full sm:w-[250px]">
                  <TabsList className="grid grid-cols-3">
                    <TabsTrigger value="week">Week</TabsTrigger>
                    <TabsTrigger value="month">Month</TabsTrigger>
                    <TabsTrigger value="year">Year</TabsTrigger>
                  </TabsList>
                </Tabs>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div ref={chartContainerRef} className={`chart-container h-[350px] relative ${isChartFullscreen ? 'fullscreen-chart' : ''}`}>
                {/* Chart toolbar hint */}
                <div className="absolute top-0 right-0 z-10 opacity-0 transition-opacity chart-hint bg-background/90 text-xs text-muted-foreground p-2 rounded-md shadow-sm border border-border">
                  <p className="font-medium mb-1">Chart Controls:</p>
                  <ul className="space-y-1 list-disc pl-4">
                    <li>Click and drag to zoom in</li>
                    <li>Double-click to reset zoom</li>
                    <li>Use toolbar icons to maximize, download, etc.</li>
                  </ul>
                </div>

                {typeof window !== 'undefined' && (
                  <>
                    {isChartLoading && (
                      <div className="absolute inset-0 flex items-center justify-center bg-background/50 z-10">
                        <div className="flex flex-col items-center">
                          <div className="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin mb-2"></div>
                          <p className="text-sm text-muted-foreground">Loading chart data...</p>
                        </div>
                      </div>
                    )}
                    <Chart
                      key={chartKey}
                      ref={chartRef}
                      options={chartOptions}
                      series={chartSeries}
                      type={chartType}
                      height="100%"
                      width="100%"
                    />
                  </>
                )}
                {chartSeries.length === 0 && !isChartLoading && (
                  <div className="absolute inset-0 flex items-center justify-center bg-background/50">
                    <p className="text-muted-foreground">No data available</p>
                  </div>
                )}
              </div>
              
              {/* Add custom CSS to enhance chart toolbar visibility */}
              <style jsx global>{`
                .chart-container:hover .chart-hint {
                  opacity: 0.9;
                }
                
                .chart-container .apexcharts-toolbar {
                  opacity: 0.2;
                  transition: opacity 0.2s ease;
                }
                
                .chart-container:hover .apexcharts-toolbar {
                  opacity: 1;
                }
                
                .fullscreen-chart {
                  background-color: var(--background);
                  padding: 1rem;
                }
                
                .fullscreen-chart .apexcharts-canvas {
                  height: 90vh !important;
                }
              `}</style>
            </CardContent>
          </Card>
          
          {/* Streaks and points */}
          <Card className="shadow-sm">
            <StreaksPointsTable />
          </Card>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <DailyTip />
              <FlashcardPreview />
            </div>
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Receipt className="h-5 w-5 text-primary mr-2" />
                    <span>Recent Transactions</span>
                  </CardTitle>
                  <Button variant="ghost" className="gap-1 h-8 font-normal text-sm">
                    <span>View all</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <TransactionList />
              </CardContent>
            </Card>
          </div>
          <div className="space-y-6">
            <BudgetOverview />
            <Card className="shadow-sm">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Target className="h-5 w-5 text-primary mr-2" />
                    <span>Financial Goals</span>
                  </CardTitle>
                  <Button variant="ghost" className="gap-1 h-8 font-normal text-sm">
                    <span>View all</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-5">
                  {[
                    { name: 'Emergency Fund', icon: <Wallet className="h-4 w-4" />, color: 'emerald-500', progress: 85 },
                    { name: 'House Down Payment', icon: <Home className="h-4 w-4" />, color: 'blue-500', progress: 45 },
                    { name: 'Retirement', icon: <TrendingUp className="h-4 w-4" />, color: 'violet-500', progress: 28 }
                  ].map((goal, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex-1 pr-4">
                        <div className="flex items-center gap-2 mb-1">
                          <div className={`h-6 w-6 rounded-full bg-${goal.color}/20 flex items-center justify-center text-${goal.color}`}>
                            {goal.icon}
                          </div>
                          <p className="font-medium">{goal.name}</p>
                        </div>
                        <div className="w-full bg-secondary/50 rounded-full h-2 mt-1">
                          <div 
                            className={cn(
                              "h-full rounded-full",
                              `bg-${goal.color}`
                            )}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium">
                          {index === 0 ? '₹8,500' : index === 1 ? '₹45,000' : '₹280,000'}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {index === 0 ? '₹10,000' : index === 1 ? '₹100,000' : '₹1,000,000'}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard; 