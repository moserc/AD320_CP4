# *Moss Quotes* API Documentation
Provides Maurice Moss (The IT Crowd) quotes searchable by topic. 

## Get a list of Moss quotes by topic.
**Request Format:** /topics

**Request Type:** GET

**Returned Data Format**: Plain Text

**Description:** Return a list of all quote topics that you can look up in this API.


**Example Request:** /topics

**Example Response:**

```
computers, fashion, football, sass
```

**Error Handling:**
N/A

## Find a Moss quote.
**Request Format:** /:topic

**Request Type:** GET

**Returned Data Format**: JSON

**Description:** Returns a Maurice Moss quote associated with the given topic.

**Example Request:** /fashion

**Example Response:**

```json
{
    "quote": "I like being weird. Weird's all I've got. That and my sweet style."
}
```

**Error Handling:**
Possible 400 (invalid request) errors (json):
  - On invalid entry, returns an error with the json object:
      {'error': 'Unable to find topic. Check spelling. Entries should be all lowercase.'}
