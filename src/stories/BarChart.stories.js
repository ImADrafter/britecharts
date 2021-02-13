import { select } from 'd3-selection'

import bar from '../charts/bar'

import { BarDataBuilder } from './../../test/fixtures/barChartDataBuilder';
import customRender from './customRender';

const dataBuilder = () => new BarDataBuilder()

const testData = dataBuilder().withLettersFrequency().build();

export default {
    title: 'Bar Chart',
    argTypes: {
        dataSet: { control: 'object' },
  },
};

/**
 * TODO: ...
 * - Manage to run eslint on .stories files
 * - Render a node
 */

// Bad news: https://stackoverflow.com/questions/63992928/storybook-callback-when-a-story-has-been-rendered

const container_id = 'bar-chart-container'
const buildBarChart = (dataSet) => {
  const barChart = bar();
  const myBarChartContainer = select(`#${container_id}`)

  const containerWidth = myBarChartContainer.node()
            ? myBarChartContainer.node().getBoundingClientRect().width
            : false;

  if (containerWidth) {
    barChart.width(containerWidth).height(300)
    .hasPercentage(true)
    .enableLabels(true)
    .labelsNumberFormat('.0%')
  }

  myBarChartContainer.datum(dataSet).call(barChart)
}

const renderContainer = () => `
  <div id="parent">
    <div id="${container_id}"></div>
  </div>` 

export const Base = ({dataSet}) => customRender(renderContainer(), () => buildBarChart(dataSet))
Base.args = {
  dataSet: testData,
}
