import React, {useState} from 'react';
import { NumberInput, Button } from 'carbon-components-react'
import { InlineMath, BlockMath } from 'react-katex';
import {
  ScatterChart, Scatter, XAxis, YAxis, ZAxis, CartesianGrid, Tooltip, Legend,
} from 'recharts';

export function Graph(props: { formula: string, calculation_vars: string; width: number; onCalculate(vars: { [key: string]: number }): void; data: {x: number, y: number}[] }) {
    const [vars, changeVars] = useState({})
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            width: '100%',
            marginTop: 10
        }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
            <h4 style={{
                fontWeight: 'bold',
                marginRight: 10
            }}>
                Plot
            </h4>
            <InlineMath math={props.formula} />
            </div>
            <div style={{ flexDirection: "column", display: 'flex', width: '100%', justifyContent: 'space-between' }}>
                {props.data.length === 0 ? null : (
                    <div style={{
                        width: '100%'
                    }}>
                        <ScatterChart
                            width={props.width < 800 ? 0.8 * props.width : 0.6 * props.width}
                            height={(props.width < 800 ? 0.8 * props.width : 0.6 * props.width)/2}
                            margin={{
                                top: 20, right: 20, bottom: 20, left: 20,
                            }}
                        >
                            <CartesianGrid />
                            <XAxis type="number" dataKey="x" name="x"/>
                            <YAxis type="number" dataKey="y" name="y"/>
                            <Tooltip cursor={{ strokeDasharray: '1 1' }} />
                            <Scatter data={props.data} fill="#8884d8" />
                        </ScatterChart>
                    </div>
                )}
                <div style={{display: 'flex', flexDirection: 'column'}}>
                    <div>
                        {props.calculation_vars.split(",").map((i) => {
                            if (!(i in vars)) {
                                if (i.toLowerCase() !== "y" && i.toLowerCase() !== "x") {
                                    vars[i] = 1
                                }
                            }
                            if (i.toLowerCase() !== "y" && i.toLowerCase() !== "x") {
                                return (
                                    <div style={{ display: 'flex', marginTop: 10, alignItems: 'center', width: props.width > 850 ? "50%" : "100%", justifyContent: 'space-between' }}>
                                        <div style={{ width: 40 }}>
                                            <span>{i}:</span>
                                        </div>
                                        <NumberInput value={vars[i]} defaultValue={1} step={0.5} invalidText="Please enter a valid number" isMobile={props.width < 850} onChange={(text) => {
                                            vars[i] = text.imaginaryTarget.valueAsNumber
                                            changeVars(vars)
                                        }} />
                                    </div>
                                )
                            }
                        })}
                    </div>
                    <div style={{ marginTop: 15 }}>
                        <Button onClick={() => props.onCalculate(vars)}>Plot</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}