import React from 'react';
import { InlineMath, BlockMath } from 'react-katex';
import { Legend20 } from "@carbon/icons-react"
import { Button } from 'carbon-components-react'

export function EquationHeader(props: { formula: string; title: string; topic: string; width: number; toggleModal?(): void; legend?: boolean }) {
    const isMobile = props.width < 850
    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{marginBottom: 15}}>
                <h1 style={{ fontWeight: 'bold', marginBottom: 5 }}>{props.title}</h1>
                <h5>{props.topic}</h5>
            </div>
            <div style={{ display: 'flex', justifyContent: isMobile ? "flex-start" : 'space-between', alignItems: isMobile ? "flex-start" : 'center', flexDirection: isMobile ? "column" : "row" }}>
                <BlockMath math={"\\huge " + props.formula}></BlockMath>
                {props.legend ? (
                    <div style={{marginTop: isMobile ? 15 : 0}}>
                        <Button renderIcon={Legend20} kind="secondary" onClick={() => props.toggleModal()}>
                            Legend
                        </Button>
                    </div>
                ) : null}
            </div>
        </div>
    )
}