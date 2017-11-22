$(document).ready(function(){
    $('#search_button').click(function(){
        $.post('http://localhost:8080/search',
        {court:$('#search_select :selected').val()},
        function(data,status){
            $('#search_div').html();
            data = JSON.parse(data);
            var str = '<table class="uk-flex-center uk-table uk-table-divider uk-table-striped uk-table-hover"><caption>Recommended Cases to Refer</caption><thead class="uk-text-center"><tr><th>SI No.</th><th>Case Files</th></tr></thead><tbody>';
            for(var i = 0;i<data.length;i++){
                str += '<tr><td>' + (i+1) +'</td><td><a target="_blank" href="../Data/' + data[i]['casename'] + '">'+ data[i]['casename'] +'</a></td></tr>';
            }
            str+= '</tbody></table>';
            $('#search_div').html(str);
        });
    });
    $('#reco_button').click(function(){
        var text = $('#reco_text').val();
        if(text == ""){
            $('#reco_status').removeClass().addClass('uk-text-danger');
            $('#reco_status').html('Please Enter the search query');
            return;
        }
        $.post('http://localhost:8080/recommend',
        {query:text},
        function(data,status){
            data = data.split('\n')
            $('#reco_div').html();
            var str = '<table class="uk-flex-center uk-table uk-table-divider uk-table-striped uk-table-hover"><caption>Recommended Cases to Refer</caption><thead class="uk-text-center"><tr><th>SI No.</th><th>Case Files</th></tr></thead><tbody>';
            for(var i = 0;i<data.length-1;i++){
                str += '<tr><td>' + (i+1) +'</td><td><a target="_blank" href="/Data/' + data[i] + '">'+ data[i] +'</a></td></tr>';
            }
            str+= '</tbody></table>';
            $('#reco_div').html(str);
        });
    });
    
});