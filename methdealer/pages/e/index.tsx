import React from 'react';
import { Page } from '../../components/Page'
import { Calculator } from '../../functions/calculator';
import { GTTopics } from '../../types/calculator';
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from 'carbon-components-react'
import {withRouter, SingletonRouter} from 'next/router'

interface EMathPageState {
}

interface EMathPageProps {
  topics: GTTopics;
  health: boolean;
  router: SingletonRouter
}

class EMathPage extends React.Component<EMathPageProps, EMathPageState> {

  static getInitialProps(): Promise<{ topics: GTTopics; health: boolean }> {
    return new Promise<{ topics: GTTopics; health: boolean }>((resolve) => {
      Calculator.initialize("e").then((d) => resolve(d)).catch((e) => console.log(e))
    })
  }

  render() {
    const rows = []
    Object.keys(this.props.topics).forEach((topic) => {
      this.props.topics[topic].forEach((eqn) => {
        rows.push({ id: eqn.id.toString(), title: eqn.title, topic })
      })
    })
    return (
      <Page currentlySelected={this.props.router.query.id as string} topics={this.props.topics} difficulty="e" health={this.props.health}>
        <div style={{ flex: 1, padding: 50 }}>
          <DataTable
            rows={rows}
            headers={[
              {
                key: 'id',
                header: 'ID',
              },
              {
                key: 'title',
                header: "Title"
              },
              {
                key: 'topic',
                header: "Topic"
              }
            ]}
            render={({ rows, headers, getHeaderProps }) => (
              <TableContainer title="E-Math">
                <Table>
                  <TableHead>
                    <TableRow>
                      {headers.map(header => (
                        <TableHeader {...getHeaderProps({ header })}>
                          {header.header}
                        </TableHeader>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {rows.map(row => (
                      <TableRow key={row.id}>
                        {row.cells.map(cell => (
                          <TableCell key={cell.id}>{cell.value}</TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          />
        </div>
      </Page>
    )
  }
}

export default withRouter(EMathPage)