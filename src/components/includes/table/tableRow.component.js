import React, { useEffect, useState } from 'react'

import CheckBox from '../checkbox/checkbox.component'

const TableRow = props => {
  const [selected, setSelected] = useState(false)

  useEffect(() => {
    setSelected(props.selectAll)
  }, [props.selectAll])

  const handleSelection = val => {
    // if (props.selectAll) return;
    setSelected(val)
    props.onSelect(val, props.item)
  }
  const checkMultiple = (obj, props) => {
    let result
    for (let i = 0; i < props.length; i++) {
      result = fetchFromObject(obj, props[i])
      if (result) return result
    }
    return ''
  }
  const fetchFromObject = (obj, prop) => {
    if (typeof obj === 'undefined') {
      return ''
    }

    if (prop === '_this_') return obj
    if (prop === '_index_')
      return props.currentPage && props.itemsPerPage
        ? (props.currentPage - 1) * props.itemsPerPage + props.index
        : props.index

    let _index = prop.indexOf('.')
    if (_index > -1) {
      if (!obj) return ''
      return fetchFromObject(
        obj[prop.substring(0, _index)],
        prop.substr(_index + 1)
      )
    }
    if (!obj) return ''
    return obj[prop] || ''
  }

  const action = () => {
    if (props.actionWrapper) {
      return (
        <props.actionWrapper item={props.item}>
          {props.action}
        </props.actionWrapper>
      )
    } else return props.action
  }

  const rowData = props.headers.map((header, index) => {
    let Data
    if (header.wrapper) {
      Data = (
        <header.wrapper
          value={fetchFromObject(props.item, header.value)}
        ></header.wrapper>
      )
    } else if (Array.isArray(header.value)) {
      Data = checkMultiple(props.item, header.value)
    } else {
      Data = `${fetchFromObject(props.item, header.value)}`
    }
    return (
      <td
        key={header.value}
        style={{
          textAlign: header.align ? header.align : 'center',
          ...header.style
        }}
      >
        {Data || 'N/A'}
      </td>
    )
  })

  return (
    <tr className={`${selected ? 'selected' : ''}`}>
      {props.selectable && (
        <td className='selector'>
          <CheckBox
            checked={selected}
            onChange={handleSelection}
            className='checkbox'
          />
        </td>
      )}
      {rowData}
      {props.action && (
        <td className={props.actionAlignment || 'center'}>
          <div
            className='pointer'
            onClick={() => {
              props.onActionClick(props.item)
            }}
          >
            {action()}
          </div>
        </td>
      )}
    </tr>
  )
}
export default TableRow
