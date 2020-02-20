import React, { useState } from 'react';
import { NumberInput, Button } from 'carbon-components-react'
import { InlineMath, BlockMath } from 'react-katex';

export function Evaluate(props: { formula: string, calculation_vars: string; width: number; onCalculate(vars: { [key: string]: number }): void }) {
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
                Evaluate
            </h4>
            <InlineMath math={props.formula} />
            </div>
            <div style={{ flexDirection: props.width < 850 ? "column" : "row", display: 'flex', alignItems: props.width < 850 ? "flex-start" : 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ width: '100%' }}>
                    {props.calculation_vars.split(",").map((i) => {
                        vars[i] = 1
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
                    })}
                </div>
                <div style={{ marginTop: props.width < 850 ? 15 : 0 }}>
                    <Button onClick={() => props.onCalculate(vars)}>Evaluate</Button>
                </div>
            </div>
        </div>
    )
}