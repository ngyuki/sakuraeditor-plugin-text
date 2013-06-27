/*
 * Sakura Editor Text Outline Plugin
 * 
 * @author ngyuki <ngyuki.ts@gmail.com>
 * @link https://github.com/ngyuki/sakuraeditor-plugin-text
 * @copyright Copyright 2012 ngyuki
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

(function(){

	var trim = function (str)
	{
		return str.replace(/^\s+/,"").replace(/\s+$/,"");
	};

	var log = function (str) {};

	if (Plugin.GetOption('debug', 'debug_enable') - 0)
	{
		log = function (str)
		{
			Editor.TraceOut(str, 1);
		};
	}

	var addOutline = function (row, column, str, level)
	{
		log(level + " ::: " + str);
		Outline.AddFuncInfo2(row, column, str, level);
	};

	// タイプ → 100:ツリー表示, 200:Javaツリー
	Outline.SetListType(100);
	Outline.SetTitle("Text");

	// 行数
	var lines = Editor.GetLineCount(0);

	// コードブロック
	var code = false;

	for (var no = 0; no < lines; no++)
	{
		var line = Editor.GetLineStr(no);

		if (!code && line.match(/^(#+)\s+\S/))
		{
			var mark = RegExp.$1;
			var level = (3 - mark.length);

			addOutline(no, 1, trim(line.replace(/^#+\s+/, '')), level < 0 ? 0 : level);
		}
		else if (line.match(/^%>>>/))
		{
			code = true;
		}
		else if (line.match(/^%<<</))
		{
			code = false;
		}
	}
})();
