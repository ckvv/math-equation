<template>
    <div class="math-equation-content">
        <div class="expression">
            <el-input v-model="expression" clearable placeholder="sin(x); x*x; log(x); x+6">
                <template slot="prepend">方程</template>
            </el-input>
        </div>
        <div id="plot"></div>
    </div>
</template>

<script>
    let {
        compile,
        range
    } = require('mathjs');
    let Plotly = require('plotly.js-dist');
    export default {
        name: 'mathEquation',
        data() {
            return {
                expression: 'sin(x); x*cos(x); x+4',
            }
        },
        watch: {
            expression(val){

                this.drawExpression(val);
            }
        },
        mounted() {
            this.drawExpression(this.expression);
        },
        methods: {
            drawExpression(val){
                let expressions = val.split(';')
                let traces = [];
                
                for(let expression of expressions){
                    if(!expression) continue;
                    let expr;
                    try {
                        expr = compile(expression)
                    } catch (error) {
                        continue;
                    }
                    const xValues = range(-12, 12, 0.01).toArray()
                    const yValues = xValues.map(function (x) {
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
        .expression{
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