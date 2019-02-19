// tslint:disable:file-header
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

/********************************************************************************
 * Copyright (C) 2019 TypeFox and others.
 *
 * This program and the accompanying materials are made available under the
 * terms of the Eclipse Public License v. 2.0 which is available at
 * http://www.eclipse.org/legal/epl-2.0.
 *
 * This Source Code may also be made available under the following Secondary
 * Licenses when the conditions for such availability set forth in the Eclipse
 * Public License v. 2.0 are satisfied: GNU General Public License, version 2
 * with the GNU Classpath Exception which is available at
 * https://www.gnu.org/software/classpath/license.html.
 *
 * SPDX-License-Identifier: EPL-2.0 OR GPL-2.0 WITH Classpath-exception-2.0
 ********************************************************************************/

// Copied from https://github.com/nodejs/node/blob/a99316065d7e3dcb452d6f50da42c8f804600c9b/test/parallel/test-net-isip.js#L27-L93

import * as assert from 'assert';
import { net } from './net';

describe('net', () => {

    assert.strictEqual(net.isIP('127.0.0.1'), 4);
    assert.strictEqual(net.isIP('x127.0.0.1'), 0);
    assert.strictEqual(net.isIP('example.com'), 0);
    assert.strictEqual(net.isIP('0000:0000:0000:0000:0000:0000:0000:0000'), 6);
    assert.strictEqual(net.isIP('0000:0000:0000:0000:0000:0000:0000:0000::0000'), 0);
    assert.strictEqual(net.isIP('1050:0:0:0:5:600:300c:326b'), 6);
    assert.strictEqual(net.isIP('2001:252:0:1::2008:6'), 6);
    assert.strictEqual(net.isIP('2001:dead:beef:1::2008:6'), 6);
    assert.strictEqual(net.isIP('2001::'), 6);
    assert.strictEqual(net.isIP('2001:dead::'), 6);
    assert.strictEqual(net.isIP('2001:dead:beef::'), 6);
    assert.strictEqual(net.isIP('2001:dead:beef:1::'), 6);
    assert.strictEqual(net.isIP('ffff:ffff:ffff:ffff:ffff:ffff:ffff:ffff'), 6);
    assert.strictEqual(net.isIP(':2001:252:0:1::2008:6:'), 0);
    assert.strictEqual(net.isIP(':2001:252:0:1::2008:6'), 0);
    assert.strictEqual(net.isIP('2001:252:0:1::2008:6:'), 0);
    assert.strictEqual(net.isIP('2001:252::1::2008:6'), 0);
    assert.strictEqual(net.isIP('::2001:252:1:2008:6'), 6);
    assert.strictEqual(net.isIP('::2001:252:1:1.1.1.1'), 6);
    assert.strictEqual(net.isIP('::2001:252:1:255.255.255.255'), 6);
    assert.strictEqual(net.isIP('::2001:252:1:255.255.255.255.76'), 0);
    assert.strictEqual(net.isIP('::anything'), 0);
    assert.strictEqual(net.isIP('::1'), 6);
    assert.strictEqual(net.isIP('::'), 6);
    assert.strictEqual(net.isIP('0000:0000:0000:0000:0000:0000:12345:0000'), 0);
    assert.strictEqual(net.isIP('0'), 0);
    assert.strictEqual(net.isIP(''), 0);

    assert.strictEqual(net.isIPv4('127.0.0.1'), true);
    assert.strictEqual(net.isIPv4('example.com'), false);
    assert.strictEqual(net.isIPv4('2001:252:0:1::2008:6'), false);
    assert.strictEqual(net.isIPv4(''), false);

    assert.strictEqual(net.isIPv6('127.0.0.1'), false);
    assert.strictEqual(net.isIPv6('example.com'), false);
    assert.strictEqual(net.isIPv6('2001:252:0:1::2008:6'), true);
    assert.strictEqual(net.isIPv6(''), false);

});
