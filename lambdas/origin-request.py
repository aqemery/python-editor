def lambda_handler(event, context):
    request = event['Records'][0]['cf']['request']
    
    if request['uri'][-1] == '/':
        request['uri'] += 'index.html'
    elif not '.' in request['uri'] and '/' in request['uri']:
        request['uri'] += '.html'
    elif not '.' in request['uri']:
        request['uri'] += '/index.html'

    return request