import assert from 'node:assert'
import vm from 'node:vm'
import debug from 'debug'

export * from './state.js'

const dbg = debug('app:test-helpr')

export function asTemplate(value) {
	return '`' + value + '`'
}

export function evalInContext({js, context}) {
	// eslint-disable-next-line new-cap
	return new vm.Script(`(${js})`).runInContext(new vm.createContext(context))
}

export async function chill({millis = 0, resolution, rejection = 'doh!'}) {
	dbg(
		'chill: millis=%o, resolution=%o, rejection=%o',
		millis,
		resolution,
		rejection,
	)
	const promise = new Promise((resolve, reject) => {
		setTimeout(() => {
			dbg('chill: chilled for [%o] ms...', millis)
			if (resolution) {
				resolve(resolution)
			} else {
				reject(rejection)
			}
		}, millis)
	})
	return promise
}

export function getUrl(path, {context, port} = {}) {
	assert(path, 'path required')
	let _path
	if (path.startsWith('http')) {
		_path = path
	} else {
		assert(port, 'port required')
		_path = `http://localhost:${port}${path}`
	}

	return evalInContext({js: asTemplate(_path), context})
}

export function requireUncached(module) {
	// eslint-disable-next-line unicorn/prefer-module
	delete require.cache[require.resolve(module)]

	// eslint-disable-next-line unicorn/prefer-module
	return require(module)
}
