import React, { Component } from 'react'


export const TableHeader = (props) => {
  const head = props.header.map((el) => {
    return (
        <th>{el}</th>
    )
  })
  return (
    <thead>
      <tr>
        {head}
      </tr>
    </thead>
  )
}

export const TableBody = (props) => {

  // const extractRow = (row, index) => {
  //   return (
  //     <tr key={index}>
  //       {Object.values(row).map((val, idx) => {
  //        <td key={idx}>{val}</td>})}
  //     </tr>
  //   )
  // }

  // const content = JSON.parse(props);
  console.log(props.content)
  const rows = props.content.map((row, index) => {    
    return (
      <tr key={index}>
        {Object.values(row).map((value) => <td>{value}</td> )}
      </tr>)
      }
    )

  return <tbody>{rows}</tbody>
}

export class Table extends Component {
  render() {

    const {content} = this.props
    const {header} = this.props

    return (
      <table>
        <TableHeader header={header}/>
        <TableBody content={content}/>
      </table>
    )
  }
}