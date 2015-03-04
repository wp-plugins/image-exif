jQuery(document).ready(function($){

	$("article.post a > img").each(function(){

		var _this = $(this).parent();

		_this.click(function(e){
			e.preventDefault();

			var dialog = $("<div id='imgDialog' title='Image'><div class='imgexif-content'><div class='imgexif-title'></div><div class='imgexif-image'></div><div class='imgexif-footer'></div></div><div class='imgexif-info'></div></div>").appendTo("body");

			dialog.find(".imgexif-image").append("<img src='" + _this.attr("href") + "' />");

			//TODO close
			$("<div class='imgexif-close'></div>")
				.appendTo(dialog.find(".imgexif-title"))
				.bind("click",function(){
					dialog.hide().remove();
					$("html").css("overflow","auto");
				});

			dialog.show();
			$("html").css("overflow","hidden");

			//TODO image height
			var imgHeight = $(window).height()-100;
			dialog.find(".imgexif-image img").css("height",imgHeight);

			//exif information
			var imgUrl = $(this).attr("href");

			$.post(ajax_object.ajax_url,
				{
					_ajax_nonce:ajax_object.author,
					action:"exif",
					url:imgUrl,
				},
				function(data){
					var json_data = $.parseJSON(data);
					dialog.find(".imgexif-info")
						.append("<div class='exif-title'>Photo Detail</div>")
						.append("<div><div class='exif-desc'>Camera</div><div class='exif-value'>"+ json_data.Camera +"</div></div>")
						.append("<div><div class='exif-desc'>Lens</div><div class='exif-value'>"+ json_data.Lens +"</div></div>")
						.append("<div><div class='exif-desc'>Focal length</div><div class='exif-value'>"+ json_data.FocalLength +"</div></div>")
						.append("<div><div class='exif-desc'>Exposure</div><div class='exif-value'>"+ json_data.ExposureTime +"</div></div>")
						.append("<div><div class='exif-desc'>F Number</div><div class='exif-value'>"+ json_data.FNumber +"</div></div>")
						.append("<div><div class='exif-desc'>ISO</div><div class='exif-value'>"+ json_data.ISOSpeedRatings +"</div></div>")
						.append("<div><div class='exif-desc'>Camera make</div><div class='exif-value'>"+ json_data.Make +"</div></div>")
					;
				}
			);
		});
	});

});