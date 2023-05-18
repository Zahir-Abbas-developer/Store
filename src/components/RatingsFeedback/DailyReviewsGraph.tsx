import { Line } from "@ant-design/plots";

const DailyReviewersGraph = () => {
  const DemoLine = () => {
    const data = [
      {
        year: "Jan",
        value: 130,
      },
      {
        year: "Feb",
        value: 140,
      },
      {
        year: "March",
        value: 220,
      },
      {
        year: "Apr",
        value: 200,
      },
      {
        year: "May",
        value: 280,
      },
      {
        year: "Jun",
        value: 350,
      },
      {
        year: "July",
        value: 290,
      },
      {
        year: "Aug",
        value: 295,
      },
      {
        year: "Sep",
        value: 250,
      },
      {
        year: "Oct",
        value: 460,
      },
      {
        year: "Nov",
        value: 320,
      },
      {
        year: "Dec",
        value: 280,
      },
    ];
    const config = {
      data,
      xField: 'year',
      yField: 'value',
      xAxis: {
        tickCount: 12,
      },
      yAxis: {
        label: {
          formatter: (v:any) => `${(v)}K`,
        },
      },
    };

    return <Line {...config} height={170} />;
  };
  return <DemoLine />;
};

export default DailyReviewersGraph;
