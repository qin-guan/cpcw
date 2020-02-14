import React from 'react'
import { DataTable, TableContainer, Table, TableHead, TableRow, TableHeader, TableBody, TableCell } from 'carbon-components-react'

export function SummaryTable(props: {
    rows: { id: string, title: string, topic: string }[],
    tableTitle: string,
    onClick(id: string): void
}) {
    return (
        <DataTable
            rows={props.rows}
            headers={[
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
              <TableContainer title={props.tableTitle}>
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
                      <TableRow onClick={() => props.onClick(row.id)} key={row.id}>
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
    )
}