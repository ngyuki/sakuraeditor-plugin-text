/*
 * Sakura Editor Text Outline Plugin
 * 
 * @author ngyuki <ngyuki.ts@gmail.com>
 * @link https://github.com/ngyuki/sakuraeditor-plugin-text
 * @copyright Copyright 2012 ngyuki
 * @license http://www.opensource.org/licenses/mit-license.php MIT License
 */

(function(){

	if (Plugin.GetOption('debug', 'debug_enable') - 0)
	{
		var trace = function (str)
		{
			Editor.TraceOut(str);
		};

		var debug = true;
	}
	else
	{
		var trace = function (str) {};

		var debug = false;
	}

	var trim = function (str)
	{
		return str.replace(/^\s+/,"").replace(/\s+$/,"");
	};

	var addOutline = function (row, column, str, level)
	{
		debug && trace("<" + level + "> " + str + "  (" + row + ", " + column + ")");
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
			var level = (3 - RegExp.$1.length);

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
