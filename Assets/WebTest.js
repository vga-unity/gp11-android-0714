#pragma strict

import System.Collections.Generic;

function Start () 
{
//	var www = WWW("http://www.vantan-game.com/wp-content/uploads/2012/06/otome_summer_224_o.jpg");
//	yield www;
//	
//	renderer.material.mainTexture = www.texture;
//	
//	
//	var www2 = WWW("http://translate.google.com/translate_tts?tl=en&q=Hellow");
//	yield www2;
//	
//	audio.clip = www2.GetAudioClip(false, false, AudioType.MPEG);
//	audio.Play();

	var www = WWW("https://api.twitter.com/1/statuses/user_timeline.json?screen_name=shuumai");
	yield www;

	var list = MiniJSON.Json.Deserialize(www.text) as List.<Object>;
	
	for(var i = 0; i < list.Count; i++)
	{
		var entry = list[i] as Dictionary.<String, Object>;
		Debug.Log(entry["text"]);
	}
	
	var user = entry["user"] as Dictionary.<String, Object>;
	var icon = WWW(user["profile_image_url"]);
	yield icon;
	
	renderer.material.mainTexture = icon.texture;
	
	for(i = 0; i < list.Count; i++)
	{
		entry = list[i] as Dictionary.<String, Object>;
		
		var text = entry["text"] as String;
		for(var p = 16; p < text.Length; p+= 17)
		{
			text = text.Insert(p, "\n");
		}
		GameObject.Find("twitter").GetComponent.<TextMesh>().text = text;
		
		GameObject.Find("balloonPivot").animation.Play();
		
		yield WaitForSeconds(3.0);
	}

}

function Update () 
{

}