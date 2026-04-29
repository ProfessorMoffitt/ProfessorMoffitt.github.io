---
layout: default
title: Blog
---

Short posts about accounting education, analytics, AI, careers, and student success.

## Posts

{% for post in site.posts %}
- [{{ post.title }}]({{ post.url | relative_url }})  
  {{ post.date | date: "%B %-d, %Y" }}
{% endfor %}