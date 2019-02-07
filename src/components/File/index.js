import React, { createElement } from 'react'
import PropTypes from 'prop-types'
import cx from 'classnames'
import { compose } from 'ramda'
import { Blank } from '~/components'
import { isEmpty, isExist, extract, noop } from '~/utils'
import {
  getNextLineup,
  computeSpecial,
  parseSelectedLineupItem
} from '~/chess/core'
import { isDarkBg, getSpecial } from '~/chess/helpers'
import css from './File.css'

const File = (props) => {
  const {
    turn,
    fileName,
    tile,
    lineup,
    piece,
    Piece,
    selected,
    movableTiles,
    setSelected,
    setMovableTiles,
    setLineup,
    toggleTurn
  } = props

  const isMovable = movableTiles.includes(tile)

  function handleClick (evt) {
    evt.preventDefault()

    if (isMovable && isEmpty(Piece)) {
      const {
        side: selectedSide,
        piece: selectedPiece
      } = parseSelectedLineupItem(lineup, selected)
      const special = getSpecial(selectedPiece)
      let nextLineup = getNextLineup(selected, tile, lineup)

      // draw next lineup
      if (isExist(special)) {
        nextLineup = compose(
          extract('lineup'),
          computeSpecial(selectedSide, special, tile, [])
        )(nextLineup)
      }

      setLineup(nextLineup)
      setMovableTiles([])
      toggleTurn()
    }
  }

  const pieceProps = {
    turn,
    piece,
    selected,
    tile,
    isMovable,
    setSelected,
    setMovableTiles
  }

  const blankProps = {
    tagName: 'div',
    className: cx({ 'is-movable': isMovable })
  }

  const Element = Piece || Blank
  const childProps = isExist(Piece) ? pieceProps : blankProps
  const cls = cx(css.file, { 'is-dark': isDarkBg(tile) })

  return (
    <div className={cls} data-file={fileName} onClick={handleClick}>
      {createElement(Element, childProps)}
    </div>
  )
}

File.propTypes = {
  turn: PropTypes.string.isRequired,
  fileName: PropTypes.string.isRequired,
  tile: PropTypes.string.isRequired,
  lineup: PropTypes.array.isRequired,
  selected: PropTypes.string,
  piece: PropTypes.string,
  Piece: PropTypes.func,
  movableTiles: PropTypes.array,
  setSelected: PropTypes.func,
  setMovableTiles: PropTypes.func,
  setLineup: PropTypes.func,
  toggleTurn: PropTypes.func
}

File.defaultProps = {
  movableTiles: [],
  setSelected: noop,
  setMovableTiles: noop,
  setLineup: noop,
  toggleTurn: noop
}

export default File
