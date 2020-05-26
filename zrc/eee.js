// https://github.com/developit/mitt

// https://netbasal.com/when-to-unsubscribe-in-angular-d61c6b21bad3
// http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject

class ExtendedEventEmitter {

  constructor () {
    this.all = Object.create(null);
  }

  // подписаться на получение сообщения
    on (type, handle, handler) {
        // console.log('on', {handler:handler});
        if (this.all[type] && this.all[type].single) {
            return;
        }
        (this.all[type] || (this.all[type] = [])).push({handle, handler});
        // (this.all[type] || (this.all[type] = [])).push({handle: handle, handler: handler.bind(handler)});
    }

// установить обработчик для сообщения который будет единственным обработчиком таких сообщений
    single (type, handle, handler) {
        if (this.all[type]) return;
        (this.all[type] || (this.all[type] = [])).push({handle:handle, handler:handler, single: true});
    }

// отправить сообщение
    emit (type, body) {
        (this.all[type] || []).slice().map((item) => {
            //item.handler(body);
            item.handler.call(item.handle, body);
        });
    }

// получить значение из первого попавшегося обработчика
// (такой обработчик лучше регистрировать методом single)
    get (type, body) {

        let arr = this.all[type] || [];

        if (arr.length)
            return arr[0].handler.call(arr[0].handle, body);

        return undefined;
    }

// подписать пачку обработчиков
// handlers: [
//		[msg1, handler1]
//		[msg2, handler2]
// 		...
//		[msgN, handlerN]
// ]
    batch (handle, handlers) {
        handlers = handlers || [];
        for (let item of handlers) {
            this.on(item[0], handle, item[1]);
        }
    }

// отписаться от сообщения
    off (type, handle, handler) {

        // переданы: type, handle, handler
        if (type && typeof type === 'string' && handle && handler && this.all[type]) {
            this.all[type] = this.all[type].filter(item => {
                return !(item.handle === handle && item.handler === handler);
            });
            if (this.all[type] && this.all[type].length == 0) delete this.all[type];
            return;
        }

        // переданы: type, handle
        if (type && typeof type === 'string' && handle && this.all[type] && handler === undefined) {
            this.all[type] = this.all[type].filter(item => {
                return !(item.handle === handle || item.handler === handle);
            });
            if (this.all[type] && this.all[type].length === 0) delete this.all[type];
            return;
        }

        // переданы: type
        if (type && (typeof type != 'string') && handle === undefined && handler === undefined) {
            for (let k in this.all) {
                this.all[k] = this.all[k].filter(item => {
                    // console.log('----------del', k, !(item.handle === type || item.handler === type));
                    return !(item.handle === type || item.handler === type);
                });
                if (this.all[k] && this.all[k].length == 0) delete this.all[k];
            }
            return;
        }

        // this.all[type].splice(this.all[type].indexOf(handler) >>> 0, 1);

    }

    print(){
        console.log(this.all);
    }

    clear() {
        this.all = Object.create(null);
    }

    clearExcept(arr) {
        if (arr || !Array.isArray(arr)) arr = [arr];
        for (let k in this.all) {
            this.all[k] = this.all[k].filter(item => {
                return ((arr.indexOf(item.handle)+1) || (arr.indexOf(item.handler)+1));
            });
            if (this.all[k] && this.all[k].length == 0) delete this.all[k];
        }
        return;
    }

}
