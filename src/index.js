import './style.css'

const TaskMap = {}

function adjustColumnWidth(key, table, vnode, padding = 20, some) {
  if (!table) return
  const colgroup = table.querySelector('colgroup')
  const colDefs = [...colgroup.querySelectorAll('col')]
  colDefs.forEach((col) => {
    const clsName = col.getAttribute('name')

    table.querySelectorAll(`col[name=${clsName}]`).forEach((item) => {
      item.removeAttribute('lock')
    })
    vnode.componentInstance.layout.observers.forEach(item => {
      item.onColumnsChange(item.tableLayout)
    })
  })
  if (TaskMap[key]) clearTimeout(TaskMap[key])
  TaskMap[key] = setTimeout(() => {
    colDefs.forEach((col) => {
      const clsName = col.getAttribute('name')
      const cells = [
        ...table.querySelectorAll(`td.${clsName}`),
        ...table.querySelectorAll(`th.${clsName}`)
      ]
      const classList = cells[0] && cells[0].classList
      if (!classList) return
      if (
        some
          ? cells[0].classList.contains('fit-column')
          : cells[0].classList.contains('leave-alone')
      ) {
        const widthList = cells.map((el) => {
          const cell = el.querySelector('.cell')
          const child = cell.firstElementChild || cell
          const width = child.getBoundingClientRect().width || 0
          return Math.ceil(width)
        })
        const max = Math.max(...widthList, 100)
        if (max > 0) {
          table.querySelectorAll(`col[name=${clsName}]`).forEach((item) => {
            item.setAttribute('width', max + 20)
            item.setAttribute('lock', '')
          })
        }
      }
    })
  }, 300)
}

export default {
  install(Vue) {
    Vue.directive('fit-columns', {
      update() {
      },
      bind(el, binding, vnode) {
        vnode.componentInstance.layout.observers.forEach(item => {
          item.onColumnsChange = function onColumnsChange(layout) {
            layout = layout || this.tableLayout
            var cols = this.$el.querySelectorAll('colgroup > col')
            if (!cols.length) return
            var flattenColumns = this.tableLayout.getFlattenColumns()
            var columnsMap = {}
            flattenColumns.forEach(function(column) {
              columnsMap[column.id] = column
            })
            for (var i = 0, j = cols.length; i < j; i++) {
              var col = cols[i]
              var name = col.getAttribute('name')
              var lock = col.hasAttribute('lock')
              var column = columnsMap[name]
              if (column && !lock) {
                col.setAttribute('width', column.realWidth || column.width)
              }
            }
          }
        })
      },
      inserted(el, binding, vnode) {
        el.classList.add('r-table')
        adjustColumnWidth(vnode.key, el, vnode, binding.value)
      },
      componentUpdated(el, binding, vnode) {
        el.classList.add('r-table')
        adjustColumnWidth(vnode.key, el, vnode, binding.value)
      },
      unbind() {
      }
    })

    Vue.directive('fit-columns-some', {
      update() {
      },
      bind(el, binding, vnode) {
        vnode.componentInstance.layout.observers.forEach(item => {
          item.onColumnsChange = function onColumnsChange(layout) {
            layout = layout || this.tableLayout
            var cols = this.$el.querySelectorAll('colgroup > col')
            if (!cols.length) return
            var flattenColumns = this.tableLayout.getFlattenColumns()
            var columnsMap = {}
            flattenColumns.forEach(function(column) {
              columnsMap[column.id] = column
            })
            for (var i = 0, j = cols.length; i < j; i++) {
              var col = cols[i]
              var name = col.getAttribute('name')
              var lock = col.hasAttribute('lock')
              var column = columnsMap[name]
              if (column && !lock) {
                col.setAttribute('width', column.realWidth || column.width)
              }
            }
          }
        })
      },
      inserted(el, binding, vnode) {
        el.classList.add('r-table')
        adjustColumnWidth(vnode.key, el, vnode, binding.value, true)
      },
      componentUpdated(el, binding, vnode) {
        el.classList.add('r-table')
        adjustColumnWidth(vnode.key, el, vnode, binding.value, true)
      },
      unbind() {
      }
    })
  }
}
