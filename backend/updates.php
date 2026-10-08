<?php
/** GET → Update[] (newest first) */
require __DIR__ . '/lib/bootstrap.php';
allow('GET');
json_out(content_list('update'));
