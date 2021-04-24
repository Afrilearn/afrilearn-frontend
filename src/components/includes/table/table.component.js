import React, { useState, useEffect, useRef } from 'react'

import CheckBox from '../checkbox/checkbox.component'

import './css/style.css'
import TableRow from './tableRow.component'

const Table = props => {
  const [selectAll, setSelectAll] = useState(false)
  const [selections, setSelections] = useState([])
  const [selectionCount, setSelectionCount] = useState(0)

  const selectionsRef = useRef()
  selectionsRef.current = selections
  useEffect(() => {
    if (props.onItemsSelected) {
      props.onItemsSelected(selections)
    }
  }, [selections])
  useEffect(() => {
    if (!props.keepItems) {
      if (selectionCount !== 0) setSelectionCount(0)
      if (selections.length !== 0) setSelections([])
    }
    if (selectAll) setSelectAll(false)
  }, [props.items])
  const handleSelectAll = e => {
    if (!props.onItemsSelected) {
      alert("No 'onItemsSelected' prop specified")
      return
    }
    if (!selectAll) {
      let arr = props.items.slice()
      setSelections(arr)
      setSelectionCount(arr.length)
    } else {
      setSelections([])
      setSelectionCount(0)
    }
    setSelectAll(!selectAll)
  }

  const handleSelect = (val, item) => {
    function shallowEqual (object1, object2) {
      const keys1 = Object.keys(object1)
      const keys2 = Object.keys(object2)

      if (keys1.length !== keys2.length) {
        return false
      }

      for (let key of keys1) {
        if (object1[key] !== object2[key]) {
          return false
        }
      }

      return true
    }
    if (!props.onItemsSelected) {
      alert("No 'onItemsSelected' prop specified")
      return
    }
    if (val) {
      if (!selections.includes(item)) {
        let arr = selections.slice()
        arr.push(item)
        setSelections(arr)
        setSelectionCount(selectionCount + 1)
        props.onItemsSelected(arr)
      }
    } else {
      let ind = selections.findIndex(selection => shallowEqual(selection, item))
      if (ind > -1) {
        let arr = selections.slice()
        arr.splice(ind, 1)
        setSelections(arr)
        setSelectionCount(selectionCount - 1)
        props.onItemsSelected(arr)
      }
    }
  }

  const onActionClick = item => {
    if (!props.onActionClicked) {
      alert("No 'onActionClicked' prop specified")
      return
    }
    props.onActionClicked(item)
  }

  const itemKey = item => {
    return props.key_
      ? item[props.key_]
      : item._id || item.id || item.name || item.createdAt
  }

  return (
    <div
      id='table'
      style={props.style}
      className={`general-shadow ${props.loading ? 'loading' : ''} ${
        props.className
      }`}
    >
      <table>
        <thead>
          <tr>
            {props.selectable && (
              <th className='selector'>
                <CheckBox
                  checked={selectionCount > 0}
                  onChange={handleSelectAll}
                  className='checkbox'
                  style={{ transform: 'translateY(1px)' }}
                  icon={
                    selectionCount == props.items.length ? (
                      false
                    ) : (
                      <i
                        className='fa fa-minus'
                        style={{
                          fontSize: 12,
                          color: 'white',
                          position: 'absolute'
                        }}
                      ></i>
                    )
                  }
                  disabled={props.items.length === 0}
                />
              </th>
            )}
            {props.headers &&
              props.headers.map((header, index) => (
                <th
                  key={index}
                  style={{ textAlign: header.align ? header.align : 'center' }}
                >
                  {header.text || header.value}
                </th>
              ))}
            {props.action && <th className={props.actionAlignment || 'center'}>
              {props.actionName || 'Action'}
            </th>}
          </tr>
        </thead>
        <tbody>
          {props.items.length > 0 &&
            !props.loading &&
            props.items.map((item, index) => {
              return (
                <TableRow
                  key={`${index}${itemKey(item)}`}
                  selectable={props.selectable}
                  headers={props.headers}
                  item={item}
                  action={props.action}
                  actionAlignment={props.actionAlignment}
                  selectAll={selectAll}
                  onSelect={handleSelect}
                  onActionClick={onActionClick}
                  index={index + 1}
                  currentPage={props.currentPage}
                  itemsPerPage={props.itemsPerPage}
                  actionWrapper={props.actionWrapper}
                />
              )
            })}
        </tbody>
      </table>
      {!props.items.length && !props.loading && (
        <div className='center pt-5 pb-4'>
          {!props.loading &&
            (props.inactiveState
              ? props.inactiveMessage || 'No data has been queried'
              : `No ${props.for || 'data'} available`)}
        </div>
      )}
      {props.loading && <div className='center pt-5 pb-4'>...loading</div>}
    </div>
  )
}

export default Table
