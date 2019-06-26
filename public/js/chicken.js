var chicken = io('/main');

$('#data-button').click(function()
{
    var input_val = $('#data-input').val();

    //chicken.emit('usb input', input_val);

    //$('#data-input').val('');
});

$('#data-r, #data-g, #data-b').change(function()
{
    var input_val = $('#data-r').val() + ";" + $('#data-g').val() + ";" + $('#data-b').val();

    chicken.emit('usb input', input_val);
});

chicken.on('usb output', function(returned)
{
    console.log(returned);
});