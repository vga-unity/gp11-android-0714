#pragma strict

import System.Collections.Generic;

//function Start()
//{
//	var www = WWW("http://www.universe-s.com/img/news/2004/0520_01.jpg");
//	yield www;
//	
//	renderer.material.mainTexture = www.texture;
//	//Debug.Log(www.text);
//	
//	var www2 = WWW("http://translate.google.com/translate_tts?tl=en&q=HitoshiNakamura");
//	yield www2;
//	
//	// 1:効果音かどうか	2:ストリーミングかどうか	3:フォーマットのタイプ
//	audio.clip = www2.GetAudioClip(false, false, AudioType.MPEG);
//	audio.Play();
//}

// http://translate.google.com/translate_tts?tl=en&q=HitoshiNakamura
// http://www.universe-s.com/img/news/2004/0520_01.jpg

function Start()
{
	var www = WWW("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=shuumai");
	yield www;
	
	Debug.Log(www.text);
	
	var list = MiniJSON.Json.Deserialize(www.text) as List.<Object>;
	
	for (var i = 0; i < list.Count; i++)
	{
		var entry = list[i] as Dictionary.<String, Object>;
		Debug.Log(entry["text"]);
	}
	
	var user = entry["user"] as Dictionary.<String, Object>;
	var icon = WWW(user["profile_image_url"]);
	yield icon;
	
	renderer.material.mainTexture = icon.texture;
	
	for (i = 0; i < list.Count; i++)
	{
		entry = list[i] as Dictionary.<String, Object>;
		var text = entry["text"] as String;
		
		for (var p = 16; p < text.Length; p += 17)
		{
			text = text.Insert(p, "\n");
		}
		
		GameObject.Find("Tweet").GetComponent.<TextMesh>().text = text;
		GameObject.Find("Balloon Pivot").animation.Play();
		yield WaitForSeconds(3.0);
	}
}

function Update()
{

}