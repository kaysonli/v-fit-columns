import './style.scss'

function adjustColumnWidth(table, padding = 32, some) {
	const colgroup = table.querySelector('colgroup')
	const colDefs = [...colgroup.querySelectorAll('col')]
	colDefs.forEach((col) => {
		const clsName = col.getAttribute('name')
		const cells = [
			...table.querySelectorAll(`td.${clsName}`),
			...table.querySelectorAll(`th.${clsName}`)
		]

		if (!cells[0] || !cells[0].classList) return
		if (
			some
				? cells[0].classList.contains('fit-column')
				: cells[0].classList.contains('leave-alone')
		) {
			const widthList = cells.map((el) => {
				/*
        以子元素宽度计算
        当需要自动撑开的时候
        对cell的子元素添加强制不换行样式
        从而获取到实际的宽度
        解决的问题是
        如果第一次获取到的列表数据内容本身比较长
        并且自动撑开了
        如果第二次获取的数据没有这么长
        但是列的宽度不会缩回来

        In child element widths
        When it needs to be self-propped
        Add a forced line break style to the child elements of the cell
        To get the actual width
        The problem is that
        If the first time you get the list data content itself is long
        And it opened itself
        If I didn't get this long the second time
        But the width of the column does not shrink back
         */
				const child = el.querySelector('.cell').firstElementChild
				return (child && Number(child.scrollWidth)) || 0
			})
			const max = Math.max(...widthList)
			max > 0 &&
				table.querySelectorAll(`col[name=${clsName}]`).forEach((el) => {
					el.setAttribute('width', max + padding)
				})
		}
	})
}

export default {
	install(Vue) {
		Vue.directive('fit-columns', {
			update() {},
			bind() {},
			inserted(el, binding) {
				el.classList.add('r-table')
				setTimeout(() => {
					adjustColumnWidth(el, binding.value)
				}, 300)
			},
			componentUpdated(el, binding) {
				el.classList.add('r-table')
				setTimeout(() => {
					adjustColumnWidth(el, binding.value)
				}, 300)
			},
			unbind() {}
		})

		Vue.directive('fit-columns-some', {
			update() {},
			bind() {},
			inserted(el, binding) {
				el.classList.add('r-table')
				setTimeout(() => {
					adjustColumnWidth(el, binding.value, true)
				}, 300)
			},
			componentUpdated(el, binding) {
				el.classList.add('r-table')
				setTimeout(() => {
					adjustColumnWidth(el, binding.value, true)
				}, 300)
			},
			unbind() {}
		})
	}
}
