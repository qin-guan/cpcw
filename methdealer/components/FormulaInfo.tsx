import React from 'react';
import { Equation, GTTopics } from '../types/calculator';
import {EquationHeader} from '../components/EquationHeader'
import { Loading, Modal, Accordion, AccordionItem } from 'carbon-components-react'
import { Evaluate } from '../components/Evaluate'
import { BlockAnswer } from '../components/BlockAnswer'
import { Simplify } from '../components/Simplify';
import { LineChart, Line } from 'recharts';
import { Calculator } from '../functions/calculator';

export function FormulaInfo(props: {width: number, height: number; equation: Equation}) {
    return (
        <div style={{ display: 'flex', padding: 48, flexDirection: 'column', flex: 1 }}>
              <EquationHeader toggleAlternativeModal={() => this._toggleAlternativeModal()} alternative={props.equation.alternative !== "_"} toggleModal={() => this._toggleModal()} legend={props.equation.legend !== "_"} formula={props.equation.formula} title={props.equation.title} topic={props.equation.topic} width={props.width} />
            {props.equation.description ? (
              <div style={{ marginTop: 30 }}>
                <h3 style={{
                  fontWeight: 'bold',
                  marginBottom: 10
                }}>
                  Description
              </h3>
                {props.equation.description !== "_" ? (
                  <p style={{
                    whiteSpace: 'pre-wrap'
                  }}>{props.equation.description}</p>
                ) : <span>This formula does not have a description</span>}
              </div>
            ) : null}
            <div style={{ marginTop: 30 }}>
              <h3 style={{ marginBottom: 10 }}>
                Calculator
              </h3>
              <Accordion>
                <AccordionItem title={"Evaluate"}>
                  {props.equation.calculation_formula !== "_" ? (
                    <>
                      <Evaluate formula={props.equation.formula} onCalculate={(vars) => {
                        Calculator.calculateValue(props.equation.id, vars).then((v) => this.setState({ answer: v })).catch((e) => console.error(e))
                      }} width={props.width} calculation_vars={props.equation.calculation_vars} />
                      <BlockAnswer katex={this.state.answer} units={props.equation.calculated_units} />
                    </>
                  ) : <span>Evaluate is not available for this equation</span>}
                </AccordionItem>
                <AccordionItem title={"Simplify"}>
                  {props.equation.simplify_formula !== "_" ? (
                    <>
                      <Simplify formula={props.equation.formula} onCalculate={(vars) => {
                        Calculator.calculateValue(props.equation.id, vars).then((v) => this.setState({ simplifyAnswer: v })).catch((e) => console.error(e))
                      }} width={props.width} calculation_vars={props.equation.calculation_vars} />
                      <BlockAnswer katex={this.state.simplifyAnswer} units={props.equation.calculated_units} />
                    </>
                  ) : <span>Simplify is not available for this equation</span>}
                </AccordionItem>
              </Accordion>
            </div>
            <div style={{ marginTop: 30 }}>
              <h3 style={{ marginBottom: 10 }}>
                Resources
              </h3>
              {props.equation.resource_links === "_" ? (
                <p>
                  Resources are not available for this equation
                </p>
              ) : null}
              {props.equation.resource_links.split(",").map((link) => {
                return (
                  <div style={{width: '100%', display: 'flex', flexDirection: 'column'}}>
                  <img src={link} alt={link} style={{
                    maxWidth: '80%',
                    maxHeight: props.height / 2,
                    objectFit: 'contain'
                  }}/>
                  <a href={link}>
                    {link}
                  </a>
                </div>
                )
              })}
            </div>
          </div>
    )
}