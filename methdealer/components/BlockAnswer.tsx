import React from 'react';
import { InlineMath } from 'react-katex'

export function BlockAnswer(props: { katex: string; units: string }) {
    if (props.katex) {
        return (
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                marginTop: 20,
                borderTopColor: 'rgba(0,0,0,0.2)',
                borderTopWidth: 2,
                borderTopStyle: 'solid',
                paddingTop: 15,
            }}>
                <h4 style={{marginBottom: 10}}>Answer:</h4>
                <InlineMath math={"\\Large " + props.katex + (props.units === "_" ? "" : props.units)} />
            </div>
        )
    }
    return null
}