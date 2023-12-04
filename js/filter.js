$('.filter').each(function() {
  var classes = $(this).attr('class'),
    id = $(this).attr('id'),
    name = $(this).attr('name');
  var template = '<div class="' + classes + '">';
  template +=
    '<span class="filter__trigger">' + $(this).attr('placeholder') + '</span>';
  template += '<div class="filter__custom-options">';
  $(this)
    .find('option')
    .each(function() {
      template +=
        '<span class="filter__custom-option ' +
        $(this).attr('class') +
        '" data-value="' +
        $(this).attr('value') +
        '">' +
        $(this).html() +
        '</span>';
    });
  template += '</div></div>';

  $(this).wrap('<div class="filter__wrapper"></div>');
  $(this).hide();
  $(this).after(template);
});
$('.custom-option:first-of-type').hover(
  function() {
    $(this)
      .parents('.filter__custom-options')
      .addClass('option-hover');
  },
  function() {
    $(this)
      .parents('.filter__custom-options')
      .removeClass('option-hover');
  }
);
$('.filter__trigger').on('click', function() {
  $('html').one('click', function() {
    $('.filter').removeClass('opened');
  });
  $(this)
    .parents('.filter')
    .toggleClass('opened');
  event.stopPropagation();
});
$('.filter__custom-option').on('click', function() {
  $(this)
    .parents('.filter__wrapper')
    .find('select')
    .val($(this).data('value'));
  $(this)
    .parents('.filter__custom-options')
    .find('.filter__custom-option')
    .removeClass('selection');
  $(this).addClass('selection');
  $(this)
    .parents('.filter')
    .removeClass('opened');
  $(this)
    .parents('.filter')
    .find('.filter__trigger')
    .text($(this).text());
});
