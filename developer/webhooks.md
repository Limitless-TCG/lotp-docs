# Webhooks

Many use cases of the tournament data API involve regularly checking for newly finished tournaments, which can be replaced by the use of webhooks.

You can register an URL that should be called whenever a tournament on the site ends. When receiving that request, you can then automatically run whatever logic is needed to update the data in your application.

## Registering a Webhook
The option to register a webhook is found in the same form used to request an Access Key. Once approved, the webhook will show up in your user settings. On there, you can look up the webhook *secret*, that will be sent with every request so that you can verify that it's coming from us.

## Using the Webhook
When a tournament on the site ends, it will send a HTTP **POST** request to the URL specified by you.
The request body looks as follows (using a random example secret and tournamentId):

```json
{
  "secret": "88136725389a628cb2895d9430117fe5",
  "event": {
    "name": "tournament:ended",
    "tournamentId": "62c2d23f5bb1697f68463633",
    "game": "PTCG"
  }
}
```

(Currently, *tournament:ended* is the only event being sent out. If that ever changes, you will have the option to select which events should be sent to your application.)