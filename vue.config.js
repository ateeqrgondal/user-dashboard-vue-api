module.exports = {
	devServer: {
		port: 8081,
	},
	chainWebpack: config => {
		config.module.rules.delete('eslint');
	}
}
