import { RadialBar } from '@ant-design/plots';
 
 export const MyTicketDetailsInstructor = () => {
    const data = [
        {
          term: 'Zomieland',
          count: 9,
        },
        {
          term: 'Wieners',
          count: 8,
        },
        {
          term: 'Toy Story',
          count: 8,
        },
      ];
      const config:any = {
        data,
        xField: 'term',
        yField: 'count',
        radius: 1,
        innerRadius: 0.4,
        startAngle: Math.PI * 0.5,
        endAngle: Math.PI * 2.5,
        tooltip: {
          showMarkers: true,
        },
        type: 'line',
        annotations: [
          {
            type: 'text',
            position: ['60%', '55%'],
            content: '48 Total Tickets',
            style: {
              textAlign: 'center',
              fontSize: 24,
            },
          },
        ],
      };
      return <RadialBar {...config} style={{ height: "220px" }}/>;
 };
 
 