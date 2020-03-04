import React, {useState} from 'react'
import { TextInput, Button } from 'carbon-components-react'
import { InlineMath, BlockMath } from 'react-katex';

export function Expand(props: { formula: string, calculation_vars: string; width: number; onCalculate(vars: { [key: string]: number }): void }) {
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
                Expand
            </h4>
            <InlineMath math={props.formula} />
            </div>
            <div style={{ flexDirection: props.width < 850 ? "column" : "row", display: 'flex', alignItems: props.width < 850 ? "flex-start" : 'center', width: '100%', justifyContent: 'space-between' }}>
                <div style={{ width: '100%' }}>
                    {props.calculation_vars.split(",").map((i) => {
                        if (!(i in vars)) {
                            vars[i] = 1
                        }
                        return (
                            <div style={{ display: 'flex', marginTop: 10, alignItems: 'center', width: props.width > 850 ? "50%" : "100%", justifyContent: 'space-between' }}>
                                <div style={{ width: 40 }}>
                                    <span>{i}:</span>
                                </div>
                                <TextInput defaultValue={1} invalidText="Please enter a valid number" isMobile={props.width < 850} onChange={(e) => {
                                    vars[i] = e.target.value
                                    changeVars(vars)
                                }} />
                            </div>
                        )
                    })}
                </div>
                <div style={{ marginTop: props.width < 850 ? 15 : 0 }}>
                    <Button onClick={() => props.onCalculate(vars)}>Expand</Button>
                </div>
            </div>
        </div>
    )
}