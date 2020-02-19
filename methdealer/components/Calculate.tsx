import React from 'react';
import {TextInput} from 'carbon-components-react'

export function Calculate(props: {calculation_vars: string; width: number}) {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start'
          }}>
            <h3 style={{
              fontWeight: 'bold',
              marginBottom: 10
            }}>
              Calculate
            </h3>
            {props.calculation_vars.split(",").map((i) => {
              return (
                <div style={{ display: 'flex', marginTop: 10, alignItems: 'center', width: props.width > 850 ? "50%" : "70%", justifyContent: 'space-between' }}>
                  <div style={{ width: 40 }}>
                    <span>{i}:</span>
                  </div>
                  <TextInput placeholder={i} />
                </div>
              )
            })}
          </div>
    )
}