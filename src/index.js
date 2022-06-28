import './style.scss'

function adjustColumnWidth(table, padding = 32) {
	const colgroup = table.querySelector('colgroup')
	const colDefs = [...colgroup.querySelectorAll('col')]
	colDefs.forEach((col) => {
		const clsName = col.getAttribute('name')
		const cells = [
			...table.querySelectorAll(`td.${clsName}`),
			...table.querySelectorAll(`th.${clsName}`),
		]
		if (
			cells[0] &&
			cells[0].classList &&
			cells[0].classList.contains('fit-column')
		) {
			const widthList = cells.map((el) => {
				/*
				以子元素宽度计算
				当需要自动撑开的时候
				对cell的子元素添加强制不换行样式
				从而获取到实际的宽度
				 */
				const child = el.querySelector('.cell').firstElementChild
				return (child && Number(child.scrollWidth)) || 0
			})
			const max = Math.max(...widthList)
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
			unbind() {},
		})
	},
}
