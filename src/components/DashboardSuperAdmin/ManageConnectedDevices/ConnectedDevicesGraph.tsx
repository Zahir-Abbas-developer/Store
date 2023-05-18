import { Pie, getCanvasPattern, measureTextWidth } from '@ant-design/plots';

export const ConnectedDevices = () => {
  const data = [
    {
      type: 'Laptop / PC',
      value: 50,
    },
    {
      type: 'Mobile',
      value: 40,
    },
    {
      type: 'Tablet',
      value: 10,
    },
  ];
  function renderStatistic(containerWidth:any, text:any, style:any) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:${scale}em;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }
  const pattern = (datum:any, color:any) =>
    getCanvasPattern({
      type: datum.type === '分类一' ? 'dot' : 'line',
      cfg: {
        backgroundColor: datum.type === '分类一' ? '#d78ab7' : color,
      },
    });
    
    
  const config:any = {
    appendPadding: 10,
    data,
    autoFit:true,
    angleField: 'value',
    colorField: 'type',
    padding:"auto",
    percent:false,
    radius: 0.6,
    innerRadius: 0.6,
    legend: {
      marker: (text:any, index:any, item:any) => {
        const color = item.style.fill;
        return {
          symbol: 'square',
          style: {
            fill: pattern(
              {
                type: text,
              },
              color,
            ),
            r: 8,
          },
        };
      },
    },
    color: [  "#F7B923","#EE2E7E", "#C1D2FF"],
    autoRotate: false,
    content: '{value}',
    statistic: {
      title: {
        offsetY: -4,
        customHtml: (container:any, view:any, datum:any) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = datum ? datum.type : '';
          return renderStatistic(d, text, {
            fontSize: 10,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '10px',
        },
        customHtml: (container:any, view:any, datum:any, data:any) => {
          const { width } = container.getBoundingClientRect();
          // const text = datum ? `¥ ${datum.value}` : `${data.reduce((r:any, d:any) => r + d.value, 0)}`;
          // return renderStatistic(width, text, {
          //   fontSize: 10,
          // });
        },
      },
    },
    label: null
  };

  return <Pie {...config} label={false} style={{height:"175px",marginRight:"140px"}}  />;
};
