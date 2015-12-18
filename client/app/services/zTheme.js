angular.module('app').factory('zTheme', function ($window) {
		
	var theme;

	var THEMES = [
		{
			'name': 'default',
			'cssMin': '/css/bootswatch/default.min.css'
		},
		{
			'name': 'cerulean',
			'cssMin': '/css/bootswatch/cerulean.min.css',
		},
		{
			'name': 'cosmo',
			'cssMin': '/css/bootswatch/cosmo.min.css',
		},
		{
			'name': 'cyborg',
			'cssMin': '/css/bootswatch/cyborg.min.css',
		},
		{
			'name': 'darkly',
			'cssMin': '/css/bootswatch/darkly.min.css',
		},
		{
			'name': 'flatly',
			'cssMin': '/css/bootswatch/flatly.min.css',
		},
		{
			'name': 'journal',
			'cssMin': '/css/bootswatch/journal.min.css',
		},
		{
			'name': 'lumen',
			'cssMin': '/css/bootswatch/lumen.min.css',
		},
		{
			'name': 'paper',
			'cssMin': '/css/bootswatch/paper.min.css',
		},
		{
			'name': 'readable',
			'cssMin': '/css/bootswatch/readable.min.css',
		},
		{
			'name': 'sandstone',
			'cssMin': '/css/bootswatch/sandstone.min.css',
		},
		{
			'name': 'simplex',
			'cssMin': '/css/bootswatch/simplex.min.css',
		},
		{
			'name': 'slate',
			'cssMin': '/css/bootswatch/slate.min.css',
		},
		{
			'name': 'spacelab',
			'cssMin': '/css/bootswatch/spacelab.min.css',
		},
		{
			'name': 'superhero',
			'cssMin': '/css/bootswatch/superhero.min.css',
		},
		{
			'name': 'united',
			'cssMin': '/css/bootswatch/united.min.css',
		},
		{
			'name': 'yeti',
			'cssMin': '/css/bootswatch/yeti.min.css',
		}
	];

	return {
		setCurrentTheme: function(zTheme) {
			theme = zTheme;
			$window.localStorage.setItem('theme', zTheme.name);
		},
		getCurrentTheme: function() {
			return theme;
		},
		getThemes: function() {
			return THEMES;
		}
	};
});