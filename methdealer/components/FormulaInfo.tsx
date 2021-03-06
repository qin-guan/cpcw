import React from 'react';
import { Equation, GTTopics } from '../types/calculator';
import { EquationHeader } from '../components/EquationHeader'
import { Loading, Modal, Accordion, AccordionItem } from 'carbon-components-react'
import { Evaluate } from '../components/Evaluate'
import { BlockAnswer } from '../components/BlockAnswer'
import { Simplify } from '../components/Simplify';
import { Differentiate } from '../components/Differentiate';
import { Expand } from '../components/Expand';
import { LineChart, Line } from 'recharts';
import { Calculator } from '../functions/calculator';
import {Graph} from '../components/Graph'

export function FormulaInfo(props: { toggleModal(): void; toggleAlternativeModal(): void; width: number, height: number; equation: Equation; answer: string; simplifyAnswer: string; expandAnswer: string; onCalculate(type: string, vars: { [key: string]: number }): void, graphData: {x: number, y: number}[]; diffAnswer: string}) {
  return (
    <div style={{ display: 'flex', padding: 48, flexDirection: 'column', flex: 1 }}>
      <EquationHeader toggleAlternativeModal={() => props.toggleAlternativeModal()} alternative={props.equation.alternative !== "_"} toggleModal={() => props.toggleModal()} legend={props.equation.legend !== "_"} formula={props.equation.formula} title={props.equation.title} topic={props.equation.topic} width={props.width} />
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
                  props.onCalculate("eval", vars)
                }} width={props.width} calculation_vars={props.equation.calculation_vars} />
                <BlockAnswer katex={props.answer} units={props.equation.calculated_units} />
              </>
            ) : <span>Evaluate is not available for this equation</span>}
          </AccordionItem>
          <AccordionItem title={"Simplify"}>
            {props.equation.simplify_formula !== "_" ? (
              <>
                <Simplify formula={props.equation.formula} onCalculate={(vars) => {
                  props.onCalculate("simplify", vars)
                }} width={props.width} calculation_vars={props.equation.calculation_vars} />
                <BlockAnswer katex={props.simplifyAnswer} units={props.equation.calculated_units} />
              </>
            ) : <span>Simplify is not available for this equation</span>}
          </AccordionItem>
          <AccordionItem title={"Expand"}>
            {props.equation.expand_formula !== "_" ? (
              <>
                <Expand formula={props.equation.formula} onCalculate={(vars) => {
                  props.onCalculate("expand", vars)
                }} width={props.width} calculation_vars={props.equation.calculation_vars} />
                <BlockAnswer katex={props.expandAnswer} units={props.equation.calculated_units} />
              </>
            ) : <span>Expand is not available for this equation</span>}
          </AccordionItem>
          <AccordionItem title={"Differentiate"}>
            {props.equation.diff_formula !== "_" ? (
              <>
                <Differentiate formula={props.equation.formula} onCalculate={(vars) => {
                  props.onCalculate("diff", vars)
                }} width={props.width} calculation_vars={props.equation.calculation_vars} />
                <BlockAnswer katex={props.diffAnswer} units={props.equation.calculated_units} />
              </>
            ) : <span>Differentiation is not available for this equation</span>}
          </AccordionItem>
        </Accordion>
      </div>
      <h3 style={{marginTop: 30}}>
        Graph
      </h3>
      {props.equation.graph_formula !== "_" ? (
        <div style={{
          marginTop: 10
        }}>
          <Graph data={props.graphData} formula={props.equation.formula} onCalculate={(vars) => {
            props.onCalculate("graph", vars)
          }} width={props.width} calculation_vars={props.equation.calculation_vars} />
        </div>
      ) : (
      <p>
        Graph is not available for this equation
      </p>
      )}
      <div style={{ marginTop: 30 }}>
        <h3 style={{ marginBottom: 10 }}>
          Resources
              </h3>
        {props.equation.resource_links === "_" ? (
          <p>
            Resources are not available for this equation
                </p>
        ) : props.equation.resource_links.split(",").map((link) => {
          return (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column' }}>
              <img src={link} alt={link} style={{
                maxWidth: '80%',
                maxHeight: props.height / 2,
                objectFit: 'contain'
              }} />
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