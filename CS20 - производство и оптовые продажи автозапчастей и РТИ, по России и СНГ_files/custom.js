function add2basket(id)
{
	console.log("dddd");
	var elem=$(document).find("#bnt_buy_"+id);console.log(elem);
	var count = elem.parents('[data-parent]').find('[data-count]').val();
        var product_id = id;
        var action = 'add';
		elem.text("В корзине");
        elem.addClass('product-item__btn_active');
		if($(window).width() <= 768)
		{
			elem.closest('.product-item__bottom').find('.product__count').show();
			elem.closest('.product-item__bottom').find('.card__counter').show();
			elem.hide();
		}
        $.ajax({
            dataType: 'json',
            data: {'count':count, 'action':action, 'product_id':product_id},
            type: 'POST',
            url: '/ajax/card.php',
            success: function(response){
                 $('.cart-link__badge').html(response.top_basket);
				$.post('/ajax/basket.php',{},function(data){
					$(".basket-line").html($(data));
				});
            }
        });
}
$(document).ready(function(){

    $('.first-slider').slick({
        slidesToShow: 1,
        infinite: true,
        dots: false,
        autoplay: true,
        autoplaySpeed: 5000,
        prevArrow: $('.first__arrow_prev'),
        nextArrow: $('.first__arrow_next'),
    })

    if($(window).width() > 768) {
        $('.news__layout').slick({
            infinite: true,
            dots: false,
            slidesToShow: 4,
            slidesToScroll: 4,
            arrows:true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        rows: 2,
                        slidesPerRow: 2,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }
            ]
        })
    }
    else {
        $('.news__layout').slick({
            arrows: false,
            infinite: true,
            dots: true,
            rows:2,
            slidesPerRow:2,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        rows: 2,
                        slidesToShow: 1,
                        slidesPerRow: 1,
                    }
                },
            ]
        })
    }
    if($(window).width() > 768) {
        $('.populars .js-products, .cs-section--similar .product-item__wrap').slick({
            infinite: true,
            dots: false,
            slidesToShow: 5,
            slidesToScroll: 5,
            arrows:true,
            responsive: [
                {
                    breakpoint: 1024,
                    settings: {
                        slidesToShow: 3,
                        slidesToScroll: 3,
                        infinite: true,
                    }
                },
                {
                    breakpoint: 768,
                    settings: {
                        rows: 2,
                        slidesPerRow: 2,
                        slidesToShow: 2,
                        slidesToScroll: 2,
                    }
                }
            ]
        })
    }
    else {
        $('.populars .js-products, .cs-section--similar .product-item__wrap').slick({
            arrows: false,
            infinite: true,
            dots: true,
            rows:2,
            slidesPerRow:2,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 600,
                    settings: {
                        rows: 2,
                        slidesToShow: 1,
                        slidesPerRow: 1,
                    }
                },
            ]
        })
    }


    $('.instagram__item').slick({
        dots: true,
        arrows: false
    })


	setInterval(function(){
		if($('body').hasClass("shadow") && !$('.mobile-filter.filter').hasClass("is-open")){
			$('body').removeClass("shadow");
		}
	},1000);
	function HideBtnBuy(){
		if($(window).width() <= 768)
		{
			$(document).find(".product__count").each(function(){$(this).hide();});
			$(document).find(".card__counter").each(function(){$(this).hide();});
			$(document).find(".product-item__btn_active").each(function(){
				$(this).hide();
				$(this).closest('.product-item__bottom').find('.product__count').show();
				$(this).closest('.product-item__bottom').find('.card__counter').show();
			});
		}
	}
	 HideBtnBuy();
		$('.content-wrapper').bind('DOMSubtreeModified', function(){
		   //HideBtnBuy();
		});
        $(document).on('click','.ui-tabs-anchor', function(e)
        {
            var id = $(this).data('tab');
            var id_remove =  $('.ui-tabs-active').data('tab');
            $('.ui-tabs-active').removeClass('ui-tabs-active ui-state-active');

            $(this).parents('.ui-tab').addClass('ui-tabs-active ui-state-active');
            $('#'+id_remove).hide();
            $('#'+id).show();
        });

        $(document).on('click','.counter__control--plus', function(e)
        {
            var obj = $(this);
			$('.card__inputs span').attr('data-count', parseInt($('.card__inputs span').attr('data-count')) + 1)
			$('.card__inputs span').text('В корзине '+ $('.card__inputs span').attr('data-count') +' шт')
            var count = $(this).closest(".parents").find('.counter__field').val();
            $(this).closest(".parents").find('.counter__field').val(Number(count)+1);
            count = $(this).closest(".parents").find('.counter__field').val();
            var product_id = $(this).closest(".parents").find('.counter__field').data('product');
            var action = 'add';
            if(count > 0){
                $.ajax({
                    dataType: 'json',
                    data: {'count':count, 'action':action, 'product_id':product_id},
                    type: 'POST',
                    url: '/ajax/card.php',
                    success: function(response){
                        $('#sum').html(response.total_price+'руб');
                        $('#total_sum').html(response.total_price+'руб');
                        $('#weight').html(response.total_weight+'кг.');
                        $('.cart-link__badge').html(response.top_basket);
                        obj.parents('[data-parent]').find('[data-basket]').text('В корзине');
                        obj.parents('[data-parent]').find('[data-basket]').addClass('product-item__btn_active');
						$.post('/ajax/basket.php',{},function(data){
							$(".basket-line").html($(data));
						});
                    }
                });
            }

        });
        $(document).on('click','.counter__control--minus', function(e)
        {
			$('.card__inputs span').attr('data-count', parseInt($('.card__inputs span').attr('data-count')) - 1)
				if($('.card__inputs span').attr('data-count') > 0) {
					$('.card__inputs span').text('В корзине '+ $('.card__inputs span').attr('data-count') +' шт')
				}
			else {
				$('.card__inputs').removeClass('show')
				$('.card__button-mobile').show()
			}

            var count = $(this).closest(".parents").find('.counter__field').val();
            if (count > 1) {    
                $(this).closest(".product-item").find('.counter__field').val(Number(count)-1);
                count = $(this).closest(".product-item").find('.counter__field').val();
                var product_id = $(this).closest(".product-item").find('.counter__field').data('product');
                var action = 'add';
                if(count > 0){
                    $.ajax({
                        dataType: 'json',
                        data: {'count':count, 'action':action, 'product_id':product_id},
                        type: 'POST',
                        url: '/ajax/card.php',
                        success: function(response){
                            $('#sum').html(response.total_price+'руб');
                            $('#total_sum').html(response.total_price+'руб');
                            $('#weight').html(response.total_weight+'кг.');
							$.post('/ajax/basket.php',{},function(data){
								$(".basket-line").html($(data));
							});
                        }
                    });
                }
            }
			else {

			}
        });

    $(document).on('click','[data-delete]', function(){
        var id = $(this).data('id');
        var action = 'delete';
        var obj = $(this);

        $.ajax({
            dataType: 'json',
            data: {'id':id, 'action':action},
            type: 'POST',
            url: '/ajax/card.php',
            success: function(response){
                if (response.status != false){
                    obj.parents('[data-parent]').remove();
                    $('#sum').html(response.total_price+'руб');
                    $('#total_sum').html(response.total_price+'руб');
                    $('#weight').html(response.total_weight+'кг.');
					$.post('/ajax/basket.php',{},function(data){
						$(".basket-line").html($(data));
					});
                }
            }
        });
    });


    $(document).on('click','[data-deletAll]', function(){
        var action = 'deleteAll';

        $.ajax({
            dataType: 'json',
            data: {'action':action},
            type: 'POST',
            url: '/ajax/card.php',
            success: function(response){
                if (response.status != false){
                    $('.cart__left').remove();
                    $('#sum').html(response.total_price+'руб');
                    $('#total_sum').html(response.total_price+'руб');
                    $('#weight').html(response.total_weight+'кг.');
					$.post('/ajax/basket.php',{},function(data){
						$(".basket-line").html($(data));
					});
                }
            }
        });
    });

    $(document).on('click', '.load_more', function(){

        var targetContainer = $('.product-item__wrap'),          //  Контейнер, в котором хранятся элементы
            url =  $('.load_more').attr('data-url');    //  URL, из которого будем брать элементы

        if (url !== undefined) {
            $.ajax({
                type: 'GET',
                url: url,
                dataType: 'html',
                success: function(data){

                    //  Удаляем старую навигацию
                    $('.catalog__info-view').remove();

                    var elements = $(data).find('.product-item'),  //  Ищем элементы
                        pagination = $(data).find('.catalog__info-view');//  Ищем навигацию

                    targetContainer.append(elements);   //  Добавляем посты в конец контейнера
                    targetContainer.append(pagination); //  добавляем навигацию следом

                }
            })
        }

    });
    $('.catalogs__list').each(function () {
        $(this).find('li').each(function (index) {
            if (index > 22) {
                $(this).hide()
            $(this).addClass('show');  
            }
        })
        if ($(this).find('li').length > 23) {
            $(this).find('.catalogs__all').show()
        }
    })

    $('.catalogs__all').click(function (e) {
        e.preventDefault()
        if(!$(this).hasClass('toogle')){
            $(this).parent().find('li').show()
            $(this).find('[data-button]').text('Скрыть')
            $(this).addClass('toogle')
            
        }
        else{
            $(this).removeClass('toogle')
            $(this).removeClass('show');
            $(this).parent().find('li.show').hide()
            $(this).find('[data-button]').text('Еще')   
        }
        return false
    })


    $('.footer__top').click(function () {
        var body = $('html, body');
        body.animate({scrollTop: 0}, 500)
    })
    $('.footer__title').click(function () {
        var parent = $(this).parent()
        parent.find('.footer__list').slideToggle()
    })
	$.fn.add2basket = function(msg) {
		 var count = $(this).parents('[data-parent]').find('[data-count]').val();
        var product_id = $(this).data('basket');
        var action = 'add';
        $(this).text('В корзине');
        $(this).addClass('product-item__btn_active');
		if($(window).width() <= 768)
		{
			$(this).closest('.product-item__bottom').find('.product__count').show();
			$(this).closest('.product-item__bottom').find('.card__counter').show();
			$(this).hide();
		}
        $.ajax({
            dataType: 'json',
            data: {'count':count, 'action':action, 'product_id':product_id},
            type: 'POST',
            url: '/ajax/card.php',
            success: function(response){
                 $('.cart-link__badge').html(response.top_basket);
				$.post('/ajax/basket.php',{},function(data){
					$(".basket-line").html($(data));
				});
            }
        });
 	};
    $(document).on('click','[data-basket]', function(e){
	//$('body').on('click','.js-add-in-cart', function(e){
		e.preventDefault();
        // var count = $(this).data('count');
        var count = $(this).parents('[data-parent]').find('[data-count]').val();
        var product_id = $(this).data('basket');
        var action = 'add';
        $(this).text('В корзине');
        $(this).addClass('product-item__btn_active');
		if($(window).width() <= 768)
		{
			$(this).closest('.product-item__bottom').find('.product__count').show();
			$(this).closest('.product-item__bottom').find('.card__counter').show();
			$(this).hide();
		}
        $.ajax({
            dataType: 'json',
            data: {'count':count, 'action':action, 'product_id':product_id},
            type: 'POST',
            url: '/ajax/card.php',
            success: function(response){
                 $('.cart-link__badge').html(response.top_basket);
				$.post('/ajax/basket.php',{},function(data){
					$(".basket-line").html($(data));
				});
            }
        });
    });

	$(document).on('click','.topline__filter', function () {

		if($(this).hasClass('text-right')) {
        	$('.main-screen').addClass('is-open');
			$('.smart-filter-form').addClass('is-open'); 
			$('body').addClass("shadow");
		}
		else {
			$('.mobile-filter[data-theme="sort"]').addClass('is-open')
			$('.smart-filter-form').addClass('is-open'); 
			$('body').addClass("shadow");
		}
    })
    $(document).on('click', '.mobile-filter__cross', function () {
        $('.mobile-filter').removeClass('is-open');
		$('.smart-filter-form').removeClass('is-open');
		$('body').removeClass("shadow");
    })
    $(document).on('click','.mobile-filter__body a', function (e) {
        //e.preventDefault()
        if ($(this).attr('data-theme')) {
            $('.mobile-filter[data-theme='+$(this).attr('data-theme')+']').addClass('is-open')
        }
    })
    $(document).on('click','.mobile-filter__arrow', function () {
        $(this).closest('.mobile-filter').removeClass('is-open')
    })
    $('.news__footer a').click(function () {
        console.log($(this).find('.ya-share2').length)
        if ($(this).find('.ya-share2').length) {
            $('.ya-share2__popup').toggleClass('ya-share2__popup_visible')
            return false
        }
    })

$('.sort-link').click(function(e){
	e.preventDefault();
	var catalog_sort = $(this).attr('data-value');
	var get = 'mode=ajax';
	$.cookie('catalog_sort', catalog_sort, {
      expires: 7
    });
	$.ajax({
        dataType: 'json',
        type: 'GET',
        url: '?'+get,
        success: function(response){
            $('#catalogItems').html(response.items);
            //$('#catalogPagination').html(response.pagination);
        }
    });
});
$( "[data-sort]").change(function() {
    var catalog_sort = $(this).val();
    var title = $("[data-sort] option:selected").text();
    var get = 'mode=ajax';
    console.log(get);
    $.cookie('catalog_sort', catalog_sort, {
      expires: 7
    });
    $(this).parents('[data-sort]').find('[data-sort-title]').text(title);
    $('[data-sort]').toggleClass('active');
    $.ajax({
        dataType: 'json',
        type: 'GET',
        url: '?'+get,
        success: function(response){
            $('#catalogItems').html(response.items);
           // $('#catalogPagination').html(response.pagination);
        }
    });
});

  $('.order__right a, .order__mobile').click(function (e) {
        e.preventDefault()
        var parent = $(this).closest('.order-item')
        $(parent).toggleClass('is-open')
        var content = $(this).closest('.order-item').find('.order-item__content')
        $(content).slideToggle()
        if ($(this).hasClass('order__mobile')) {
            $(this).toggleClass('active')
        }
        else {
            if ($(parent).hasClass('is-open')) {
                $(this).text('Скрыть')
                $(this).addClass('skrit')
            } else {
                $(this).text('Подробности')
                $(this).removeClass('skrit')
            }
        }
        return false
    })
    $('.header__hamburger').click(function () {
        $('.mobile-nav').toggleClass('is-open');
        $('body').addClass("shadow");
    })
    $(document).on('click','.mobile-nav .mobile-filter__cross', function () {
        $('.mobile-nav').removeClass('is-open')
        $('body').removeClass("shadow");
    })
    $('.catalogs__slider').slick({
        dots: true,
        arrows: false,
        slidesToShow: 1
    })

	console.log(123)
    $('.catalogs .nav-tabs a').click(function (e) {
        e.preventDefault()
        var link = $(this).attr('href')
        if (!$(link).hasClass('active')) {
            $('.catalogs .nav-link').removeClass('active')
            $(this).addClass('active')
            $('.catalogs .tab-pane').removeClass('active')
            $(link).addClass('active')
        }
        return false
    })
    $('.asks__header').click(function() {
        var parent = $(this).closest('.asks__item')
        $(parent).find('.asks__body').slideToggle()
        $(parent).find('.asks__body').toggleClass('active')
        if($(parent).find('.asks__body').hasClass('active')) {
            $(this).find('span').text('-')
        }
        else {
            $(this).find('span').text('+')
        }
    
    })
    $(document).on('click', '.c-dropdown__title', function() {
        $(this).parent().toggleClass('is-active')
    })
    $('.open-modal').click(function(e) {
        e.preventDefault()
        $('.modal').hide()
        $('.modal[data-auth='+ $(this).attr('data-auth') +']').css("display", "flex").fadeIn()
        return false
    })
    $('.modal__cross').click(function() {
        $('.modal').fadeOut()
    })

    $('.js-add-in-cart').click(function (e) {
        e.preventDefault()
        //$(this).parent().addClass('show-counter')
        $(this).parent().find('.product__count').find('span').text(1)
        return false
    })
	$(document).find('.card__button-mobile button').click(function() {
		$(this).parent().hide()
		$('.card__inputs').addClass('show')
		$('.card__inputs span').attr('data-count', 1)
		$('.card__inputs span').text('В корзине 1 шт')
	})
    $('.js-product-minus').click(function () {
        $(this).parent().find('span').text($(this).parent().find('span').text() - 1)
        if ($(this).parent().find('span').text() <= 0) {
            $(this).closest('.product-item__bottom').removeClass('show-counter')
        }
    })
    $('.js-product-plus').click(function () {
        $(this).parent().find('span').text(parseInt($(this).parent().find('span').text()) + 1)
    })
	$('.cs-slider__slides').slick()
	$('.cs-slider__arrow--prev').click(function(){
		$(".cs-slider__slides").slick('slickPrev');
	});
	$('.cs-slider__arrow--next').click(function(){
		$(".cs-slider__slides").slick('slickNext');
	});
	if($(window).width() < 481) {
		$('.card-info .tab__titles').slick({
			arrows: false,
			infinite: false,
			slidesToShow: 2.2,
			focusOnSelect: true
		})
	}
		/*$('.topline__filter, .js-filter--open').click(function() {
			$('.main-screen').toggleClass('is-open');
			$('.smart-filter-form').toggleClass('is-open');
		})
		$('.filter__header svg').click(function() {$('.filter').removeClass('is-open')})
		*/
		$('.mobile-filter input').change(function() {
			$('.js-close-filters').show();
			//$('body').removeClass("shadow");
		})
		$('.js-close-filters').click(function() {
			$('.mobile-filter').removeClass('is-open');
			$('.smart-filter-form').removeClass('is-open');
			$(this).hide()
		})
			$('.sorting__count').click(function() {
				$(this).toggleClass('open')})
});