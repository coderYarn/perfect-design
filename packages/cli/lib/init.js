import fs from 'fs'
/**
 *
 * @param {*} data
 * @returns string
 */
function replaceData(data, name) {
	return data.replace(/{xxx}/g, name)
}

function createFile(name, newData, fileName) {
	fs.writeFile(`./${name}/${fileName}`, newData, (error) => {
		// 创建失败
		if (error) {
			console.log(`${name}创建失败：${error}`)
		}
		// 创建成功
		console.log(`${name}创建成功！`)
	})
}
function createFile2(path, name, fileName,name2) {

	fs.readFile(path, 'utf8', (err, data) => {
		if (err) {
			console.error(err)
			return
		}

		let newData = replaceData(data, name2)
    if(path=='./demo/ApiLoader.tsx'){
      console.log(newData);
    }
		createFile(name, newData, fileName)
	})
}
function init(path,name) {

	fs.mkdir(path + '/' + name, (err) => {
		if (err) throw err // 如果出现错误就抛出错误信息

		createFile2('./demo/index.md', path + '/' + name, 'index.md',name)
		createFile2('./demo/ApiLoader.tsx', path + '/' + name, name+'.tsx',name)
		createFile2('./demo/index.tsx', path + '/' + name, 'index.tsx',name)

		fs.mkdir('./' + path + '/' + name + '/demo', { recursive: true }, (err) => {
			if (err) {
				console.log(err)
				return
			}
			fs.readFile('./demo/demo/index.tsx', 'utf8', (err, data) => {
				if (err) {
					console.error(err)
					return
				}
				let newData = replaceData(data, name)
				createFile(path + '/' + name + '/demo', newData, 'index.tsx')
			})
		})
	})
}

export default init
