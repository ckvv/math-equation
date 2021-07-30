<template>
  <div class="math-equation-content">
    <div class="expression">
      <el-input v-model="expression" clearable placeholder="2x*sin(x); x*y;">
        <template slot="prepend">方程</template>
      </el-input>
      <el-slider v-model="intervalSlider" show-input></el-slider>
    </div>
    <div id="plot"></div>
  </div>
</template>

<script>
  import {
    compile,
    range
  } from 'mathjs';
  import Plotly from 'plotly.js-dist/plotly'

  export default {
    name: 'mathEquation',
    data() {
      return {
        expression: 'sin(0.5*x); min(x%2,0.5);',
        intervalSlider: 12
      }
    },
    watch: {
      expression() {
        this.drawExpression(this.expression);
      },
      intervalSlider() {
        this.drawExpression(this.expression);
      }
    },
    mounted() {
      this.drawExpression(this.expression);
    },
    methods: {
      drawExpression(val) {
        let tracesType = (val.indexOf('x') === -1 || val.indexOf('y') === -1) ? 'scatter' : 'scatter3d'
        let expressions = val.split(';')

        if (tracesType == 'scatter') {
          this.draw2DExpression(expressions, this.intervalSlider);
        } else {
          this.draw3DExpression(expressions, this.intervalSlider);
        }
      },
      draw2DExpression(expressions, intervalSlider) {
        let traces = [];
        let intervalGap = 0.05;

        for (let expression of expressions) {
          if (!expression) continue;
          let expr;
          try {
            expr = compile(expression);
            const xValues = range(-intervalSlider, intervalSlider, intervalGap).toArray()
            const yValues = xValues.map(function(x) {
              return expr.evaluate({
                x: x
              })
            })

            traces.push({
              x: xValues,
              y: yValues,
              type: 'scatter',
              name: expression.trim()
            });
          } catch (error) {
            continue;
          }
        }

        Plotly.newPlot('plot', traces);
      },
      draw3DExpression(expressions, intervalSlider) {
        let traces = [];
        let intervalGap = 0.05;
        for (let expression of expressions) {
          if (!expression) continue;

          let haveX = expression.indexOf('x') !== -1;
          let haveY = expression.indexOf('y') !== -1;
          let expr;
          try {
            expr = compile(expression);
            const interval = range(-intervalSlider, intervalSlider, intervalGap).toArray();

            let xValues, yValues, zValues;
            if (haveX && haveY) {
              xValues = interval;
              yValues = interval;
              zValues = xValues.map(function(x) {
                return expr.evaluate({
                  x: x,
                  y: x
                })
              });
            }
            if (haveX && !haveY) {
              xValues = interval;
              yValues = interval.map(() => 0);
              zValues = xValues.map(function(x) {
                return expr.evaluate({
                  x: x,
                  y: 0,
                })
              });
            }
            if (haveY && !haveX) {
              xValues = interval.map(() => 0);
              yValues = interval;
              zValues = yValues.map(function(y) {
                return expr.evaluate({
                  x: 0,
                  y: y
                })
              });
            }

            traces.push({
              x: xValues,
              y: yValues,
              z: zValues,
              type: 'scatter3d',
              name: expression.trim()
            });

          } catch (error) {
            continue;
          }

        }

        Plotly.newPlot('plot', traces);
      }
    },
  }
</script>

<style lang="scss" scoped>
  .math-equation-content {
    width: 100%;
    height: 100%;

    .expression {
      position: fixed;
      top: 4px;
      left: 4px;
      z-index: 1000;
    }

    #plot {
      width: 100%;
      height: 100%;
    }
  }
</style>