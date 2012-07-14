#pragma strict
import System.Collections.Generic;

function Start () {
	//画像読み込み
	//var www = WWW("http://www.vantan-game.com/images/main/events.jpg");
	//yield www;
	//Debug.Log(www.text);
	//renderer.material.mainTexture = www.texture;
	
	//音声読み込み
	//var www2 = WWW("http://translate.google.com/translate_tts?tl=en&q=Hello%20world");
	//yield www2;
	/*
		引数
			1:3D空間での音声再生
			2:ストリーミング再生
			3:音声フォーマット
	*/
	//audio.clip = www2.GetAudioClip(false, false, AudioType.MPEG);
	//audio.Play();
	
	//twitter読み込み
	var www3 = WWW("http://api.twitter.com/1/statuses/user_timeline.json?screen_name=shuumai");
	yield www3;
	//MiniJsonを利用
	var list = MiniJSON.Json.Deserialize(www3.text) as List.<Object>;
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
		GameObject.Find("ShuumaiTweet").GetComponent.<TextMesh>().text = txt;
		yield WaitForSeconds(3.0);
		
		GameObject.Find("ShuumaiBalloonPivot").animation.Play();
	}
}

function Update () {

}