#pragma strict
import System.Collections.Generic;

function Start () {
	var www = WWW("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=karashi");
	yield www;
	
	var list = MiniJSON.Json.Deserialize(www.text) as List.<Object>;
	for(var i = 0; i < list.Count; i++){
		var entry = list[i] as Dictionary.<String, Object>;
	}
	var user = entry["user"] as Dictionary.<String, Object>;
	var icon = WWW(user["profile_image_url"]);
	yield icon;
	
	renderer.material.mainTexture = icon.texture;
	
	for(i = 0; i < list.Count; i++){
		entry = list[i] as Dictionary.<String, Object>;
		
		var txt = entry["text"] as String;
		for(var p = 16; p < txt.Length; p += 17){
			txt = txt.Insert(p, '\n');
		}
		GameObject.Find("KarashiTweet").GetComponent.<TextMesh>().text = txt;
		yield WaitForSeconds(5.0);
		
		GameObject.Find("KarashiBalloonPivot").animation.Play();
	}
}

function Update () {

}