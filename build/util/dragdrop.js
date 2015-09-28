define(['exports', 'module', '../polyfill/object-assign'], function (exports, module, _polyfillObjectAssign) {
  'use strict';

  module.exports = dragdrop;
  var abs = Math.abs;

  var dragThreshold = 3;

  function dragdrop(options) {

    var noOp = function noOp() {
      return true;
    };
    var doc = window.document;

    var _Object$assign = Object.assign({
      onBeforeStart: noOp,
      onStart: noOp,
      onMove: noOp,
      onCancel: noOp,
      onDrop: noOp,
      onEnd: noOp,
      onClick: noOp,
      containerNode: doc.documentElement,
      getDropResult: null
    }, options);

    var onBeforeStart = _Object$assign.onBeforeStart;
    var onStart = _Object$assign.onStart;
    var onMove = _Object$assign.onMove;
    var onCancel = _Object$assign.onCancel;
    var onDrop = _Object$assign.onDrop;
    var onEnd = _Object$assign.onEnd;
    var onClick = _Object$assign.onClick;
    var containerNode = _Object$assign.containerNode;
    var getDropResult = _Object$assign.getDropResult;

    // drag state:
    var dragStarted = false;
    var startClientX = 0;
    var startClientY = 0;
    var dragX = 0;
    var dragY = 0;

    var dragPayload = undefined;
    var dragNode = undefined;
    var dropResult = undefined;
    var dropNode = undefined;

    return { start: start };

    function start(ev, payload, node) {
      // we still need a minimum distance for actual drag
      dragStarted = false;
      var isLeftButton = ev.button === 0;
      var isTouch = (ev.targetTouches || []).length;
      if ((isLeftButton || isTouch) && onBeforeStart(ev)) {
        dragNode = node || ev.currentTarget;
        dragPayload = payload;

        var _ref = isTouch ? ev.targetTouches[0] : ev;

        var clientX = _ref.clientX;
        var clientY = _ref.clientY;
        startClientX = clientX;
        startClientY = clientY;

        doc.addEventListener('click', maybeClick);
        doc.addEventListener('mousemove', move);
        doc.addEventListener('touchmove', move);
        doc.addEventListener('mouseup', tryDrop);
        doc.addEventListener('touchend', tryDrop);
        doc.addEventListener('touchcancel', cancel);
        ev.preventDefault();
      }
    }

    function move(ev) {
      var isTouch = (ev.targetTouches || []).length;

      var _ref2 = isTouch ? ev.targetTouches[0] : ev;

      var clientX = _ref2.clientX;
      var clientY = _ref2.clientY;

      dragX = clientX - startClientX;
      dragY = clientY - startClientY;

      if (!dragStarted && abs(dragX) < dragThreshold && abs(dragY) < dragThreshold) {
        return;
      }

      if (!dragStarted) {
        onStart(ev);
        dragStarted = true;
      }

      var _anyDropResult = anyDropResult(clientX, clientY);

      var node = _anyDropResult.node;
      var result = _anyDropResult.result;

      dropNode = node;
      dropResult = result;
      onMove(state(), ev);
    }

    function cancel(ev) {
      onCancel(state(), ev);
      end(ev);
    }

    function tryDrop(ev) {
      (dropResult ? onDrop : onCancel)(state(), ev);
      end(ev);
    }

    function end(ev) {
      doc.removeEventListener('mousemove', move);
      doc.removeEventListener('touchmove', move);
      doc.removeEventListener('mouseup', tryDrop);
      doc.removeEventListener('touchend', tryDrop);
      doc.removeEventListener('touchcancel', cancel);
      dragPayload = dropNode = dropResult = null;
      onEnd(state(), ev);
    }

    function maybeClick(ev) {
      doc.removeEventListener('click', maybeClick);
      if (!dragStarted) {
        onClick(ev);
      }
    }

    function anyDropResult(clientX, clientY) {
      var node = null;
      var result = null;
      if (!getDropResult) {
        return { node: node, result: result };
      }

      node = doc.elementFromPoint(clientX, clientY);
      while (node && node !== containerNode) {
        result = getDropResult(node, dragPayload);
        // truthy: use as result
        if (result) {
          break;
        }
        // false: cancel looking immediately
        if (result === false) {
          node = null;
          break;
        }
        // falsy but not false: keep looking
        node = node.parentNode;
      }
      return { node: node, result: result };
    }

    function state() {
      return {
        dragPayload: dragPayload,
        dragNode: dragNode,
        dragX: dragX,
        dragY: dragY,
        dropResult: dropResult,
        dropNode: dropNode
      };
    }
  }
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91dGlsL2RyYWdkcm9wLmpzeCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7bUJBS3dCLFFBQVE7TUFIeEIsR0FBRyxHQUFLLElBQUksQ0FBWixHQUFHOztBQUNYLE1BQU0sYUFBYSxHQUFHLENBQUMsQ0FBQzs7QUFFVCxXQUFTLFFBQVEsQ0FBRSxPQUFPLEVBQUc7O0FBRTFDLFFBQU0sSUFBSSxHQUFHLFNBQVAsSUFBSTthQUFTLElBQUk7S0FBQSxDQUFDO0FBQ3hCLFFBQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxRQUFRLENBQUM7O3lCQVl4QixNQUFNLENBQUMsTUFBTSxDQUFFO0FBQ2pCLG1CQUFhLEVBQUUsSUFBSTtBQUNuQixhQUFPLEVBQUUsSUFBSTtBQUNiLFlBQU0sRUFBRSxJQUFJO0FBQ1osY0FBUSxFQUFFLElBQUk7QUFDZCxZQUFNLEVBQUUsSUFBSTtBQUNaLFdBQUssRUFBRSxJQUFJO0FBQ1gsYUFBTyxFQUFFLElBQUk7QUFDYixtQkFBYSxFQUFFLEdBQUcsQ0FBQyxlQUFlO0FBQ2xDLG1CQUFhLEVBQUUsSUFBSTtLQUNwQixFQUFFLE9BQU8sQ0FBRTs7UUFuQlYsYUFBYSxrQkFBYixhQUFhO1FBQ2IsT0FBTyxrQkFBUCxPQUFPO1FBQ1AsTUFBTSxrQkFBTixNQUFNO1FBQ04sUUFBUSxrQkFBUixRQUFRO1FBQ1IsTUFBTSxrQkFBTixNQUFNO1FBQ04sS0FBSyxrQkFBTCxLQUFLO1FBQ0wsT0FBTyxrQkFBUCxPQUFPO1FBQ1AsYUFBYSxrQkFBYixhQUFhO1FBQ2IsYUFBYSxrQkFBYixhQUFhOzs7QUFjZixRQUFJLFdBQVcsR0FBRyxLQUFLLENBQUM7QUFDeEIsUUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBQ3JCLFFBQUksWUFBWSxHQUFHLENBQUMsQ0FBQztBQUNyQixRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7QUFDZCxRQUFJLEtBQUssR0FBRyxDQUFDLENBQUM7O0FBRWQsUUFBSSxXQUFXLFlBQUEsQ0FBQztBQUNo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QUksSUFBSSxJQUFJLEtBQUssYUFBYSxFQUFHO0FBQ3RDLGNBQU0sR0FBRyxhQUFhLENBQUUsSUFBSSxFQUFFLFdBQVcsQ0FBRSxDQUFDOztBQUU1QyxZQUFJLE1BQU0sRUFBRztBQUNYLGdCQUFNO1NBQ1A7O0FBRUQsWUFBSSxNQUFNLEtBQUssS0FBSyxFQUFHO0FBQ3JCLGNBQUksR0FBRyxJQUFJLENBQUM7QUFDWixnQkFBTTtTQUNQOztBQUVELFlBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO09BQ3hCO0FBQ0QsYUFBTyxFQUFFLElBQUksRUFBSixJQUFJLEVBQUUsTUFBTSxFQUFOLE1BQU0sRUFBRSxDQUFDO0tBQ3pCOztBQUdELGFBQVMsS0FBSyxHQUFHO0FBQ2YsYUFBTztBQUNMLG1CQUFXLEVBQVgsV0FBVztBQUNYLGdCQUFRLEVBQVIsUUFBUTtBQUNSLGFBQUssRUFBTCxLQUFLO0FBQ0wsYUFBSyxFQUFMLEtBQUs7QUFDTCxrQkFBVSxFQUFWLFVBQVU7QUFDVixnQkFBUSxFQUFSLFFBQVE7T0FDVCxDQUFDO0tBQ0g7R0FDRiIsImZpbGUiOiJkcmFnZHJvcC5qcyIsInNvdXJjZVJvb3QiOiJzcmMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3BvbHlmaWxsL29iamVjdC1hc3NpZ24nO1xuXG5jb25zdCB7IGFicyB9ID0gTWF0aDtcbmNvbnN0IGRyYWdUaHJlc2hvbGQgPSAzO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBkcmFnZHJvcCggb3B0aW9ucyApIHtcblxuICBjb25zdCBub09wID0gKCkgPT4gdHJ1ZTtcbiAgY29uc3QgZG9jID0gd2luZG93LmRvY3VtZW50O1xuXG4gIGNvbnN0IHtcbiAgICBvbkJlZm9yZVN0YXJ0LFxuICAgIG9uU3RhcnQsXG4gICAgb25Nb3ZlLFxuICAgIG9uQ2FuY2VsLFxuICAgIG9uRHJvcCxcbiAgICBvbkVuZCxcbiAgICBvbkNsaWNrLFxuICAgIGNvbnRhaW5lck5vZGUsXG4gICAgZ2V0RHJvcFJlc3VsdFxuICB9ID0gT2JqZWN0LmFzc2lnbigge1xuICAgIG9uQmVmb3JlU3RhcnQ6IG5vT3AsXG4gICAgb25TdGFydDogbm9PcCxcbiAgICBvbk1vdmU6IG5vT3AsXG4gICAgb25DYW5jZWw6IG5vT3AsXG4gICAgb25Ecm9wOiBub09wLFxuICAgIG9uRW5kOiBub09wLFxuICAgIG9uQ2xpY2s6IG5vT3AsXG4gICAgY29udGFpbmVyTm9kZTogZG9jLmRvY3VtZW50RWxlbWVudCxcbiAgICBnZXREcm9wUmVzdWx0OiBudWxsXG4gIH0sIG9wdGlvbnMgKTtcblxuICAvLyBkcmFnIHN0YXRlOlxuICBsZXQgZHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgbGV0IHN0YXJ0Q2xpZW50WCA9IDA7XG4gIGxldCBzdGFydENsaWVudFkgPSAwO1xuICBsZXQgZHJhZ1ggPSAwO1xuICBsZXQgZHJhZ1kgPSAwO1xuXG4gIGxldCBkcmFnUGF5bG9hZDtcbiAgbGV0IGRyYWdOb2RlO1xuICBsZXQgZHJvcFJlc3VsdDtcbiAgbGV0IGRyb3BOb2RlO1xuXG4gIHJldHVybiB7IHN0YXJ0IH07XG5cblxuICBmdW5jdGlvbiBzdGFydCggZXYsIHBheWxvYWQsIG5vZGUgKSB7XG4gICAgLy8gd2Ugc3RpbGwgbmVlZCBhIG1pbmltdW0gZGlzdGFuY2UgZm9yIGFjdHVhbCBkcmFnXG4gICAgZHJhZ1N0YXJ0ZWQgPSBmYWxzZTtcbiAgICBjb25zdCBpc0xlZnRCdXR0b24gPSBldi5idXR0b24gPT09IDA7XG4gICAgY29uc3QgaXNUb3VjaCA9ICggZXYudGFyZ2V0VG91Y2hlcyB8fCBbXSApLmxlbmd0aDtcbiAgICBpZiggKGlzTGVmdEJ1dHRvbiB8fCBpc1RvdWNoKSAmJiBvbkJlZm9yZVN0YXJ0KCBldiApICkge1xuICAgICAgZHJhZ05vZGUgPSBub2RlIHx8IGV2LmN1cnJlbnRUYXJnZXQ7XG4gICAgICBkcmFnUGF5bG9hZCA9IHBheWxvYWQ7XG4gICAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGlzVG91Y2ggPyBldi50YXJnZXRUb3VjaGVzWyAwIF0gOiBldjtcbiAgICAgIFsgc3RhcnRDbGllbnRYLCBzdGFydENsaWVudFkgXSA9IFsgY2xpZW50WCwgY2xpZW50WSBdO1xuXG4gICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lciggJ2NsaWNrJywgbWF5YmVDbGljayApO1xuICAgICAgZG9jLmFkZEV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBtb3ZlICk7XG4gICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNobW92ZScsIG1vdmUgKTtcbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCAnbW91c2V1cCcsIHRyeURyb3AgKTtcbiAgICAgIGRvYy5hZGRFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0cnlEcm9wICk7XG4gICAgICBkb2MuYWRkRXZlbnRMaXN0ZW5lciggJ3RvdWNoY2FuY2VsJywgY2FuY2VsICk7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gbW92ZSggZXYgKSB7XG4gICAgY29uc3QgaXNUb3VjaCA9ICggZXYudGFyZ2V0VG91Y2hlcyB8fCBbXSApLmxlbmd0aDtcbiAgICBjb25zdCB7IGNsaWVudFgsIGNsaWVudFkgfSA9IGlzVG91Y2ggPyBldi50YXJnZXRUb3VjaGVzWyAwIF0gOiBldjtcbiAgICBkcmFnWCA9IGNsaWVudFggLSBzdGFydENsaWVudFg7XG4gICAgZHJhZ1kgPSBjbGllbnRZIC0gc3RhcnRDbGllbnRZO1xuXG4gICAgaWYoICFkcmFnU3RhcnRlZCAmJlxuICAgICAgICBhYnMoIGRyYWdYICkgPCBkcmFnVGhyZXNob2xkICYmIGFicyggZHJhZ1kgKSA8IGRyYWdUaHJlc2hvbGQgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmKCAhZHJhZ1N0YXJ0ZWQgKSB7XG4gICAgICBvblN0YXJ0KCBldiApO1xuICAgICAgZHJhZ1N0YXJ0ZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbm9kZSwgcmVzdWx0IH0gPSBhbnlEcm9wUmVzdWx0KCBjbGllbnRYLCBjbGllbnRZICk7XG4gICAgZHJvcE5vZGUgPSBub2RlO1xuICAgIGRyb3BSZXN1bHQgPSByZXN1bHQ7XG4gICAgb25Nb3ZlKCBzdGF0ZSgpLCBldiApO1xuICB9XG5cblxuICBmdW5jdGlvbiBjYW5jZWwoIGV2ICkge1xuICAgIG9uQ2FuY2VsKCBzdGF0ZSgpLCBldiApO1xuICAgIGVuZCggZXYgKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gdHJ5RHJvcCggZXYgKSB7XG4gICAgKCBkcm9wUmVzdWx0ID8gb25Ecm9wIDogb25DYW5jZWwgKSggc3RhdGUoKSwgZXYgKTtcbiAgICBlbmQoIGV2ICk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGVuZCggZXYgKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZW1vdmUnLCBtb3ZlICk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaG1vdmUnLCBtb3ZlICk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdtb3VzZXVwJywgdHJ5RHJvcCApO1xuICAgIGRvYy5yZW1vdmVFdmVudExpc3RlbmVyKCAndG91Y2hlbmQnLCB0cnlEcm9wICk7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoICd0b3VjaGNhbmNlbCcsIGNhbmNlbCApO1xuICAgIGRyYWdQYXlsb2FkID0gZHJvcE5vZGUgPSBkcm9wUmVzdWx0ID0gbnVsbDtcbiAgICBvbkVuZCggc3RhdGUoKSwgZXYgKTtcbiAgfVxuXG5cbiAgZnVuY3Rpb24gbWF5YmVDbGljayggZXYgKSB7XG4gICAgZG9jLnJlbW92ZUV2ZW50TGlzdGVuZXIoICdjbGljaycsIG1heWJlQ2xpY2sgKTtcbiAgICBpZiggIWRyYWdTdGFydGVkICkge1xuICAgICAgb25DbGljayggZXYgKTtcbiAgICB9XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGFueURyb3BSZXN1bHQoIGNsaWVudFgsIGNsaWVudFkgKSB7XG4gICAgbGV0IG5vZGUgPSBudWxsO1xuICAgIGxldCByZXN1bHQgPSBudWxsO1xuICAgIGlmKCAhZ2V0RHJvcFJlc3VsdCApIHtcbiAgICAgIHJldHVybiB7IG5vZGUsIHJlc3VsdCB9O1xuICAgIH1cblxuICAgIG5vZGUgPSBkb2MuZWxlbWVudEZyb21Qb2ludCggY2xpZW50WCwgY2xpZW50WSApO1xuICAgIHdoaWxlKCBub2RlICYmIG5vZGUgIT09IGNvbnRhaW5lck5vZGUgKSB7XG4gICAgICByZXN1bHQgPSBnZXREcm9wUmVzdWx0KCBub2RlLCBkcmFnUGF5bG9hZCApO1xuICAgICAgLy8gdHJ1dGh5OiB1c2UgYXMgcmVzdWx0XG4gICAgICBpZiggcmVzdWx0ICkge1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIGZhbHNlOiBjYW5jZWwgbG9va2luZyBpbW1lZGlhdGVseVxuICAgICAgaWYoIHJlc3VsdCA9PT0gZmFsc2UgKSB7XG4gICAgICAgIG5vZGUgPSBudWxsO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICAgIC8vIGZhbHN5IGJ1dCBub3QgZmFsc2U6IGtlZXAgbG9va2luZ1xuICAgICAgbm9kZSA9IG5vZGUucGFyZW50Tm9kZTtcbiAgICB9XG4gICAgcmV0dXJuIHsgbm9kZSwgcmVzdWx0IH07XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHN0YXRlKCkge1xuICAgIHJldHVybiB7XG4gICAgICBkcmFnUGF5bG9hZCxcbiAgICAgIGRyYWdOb2RlLFxuICAgICAgZHJhZ1gsXG4gICAgICBkcmFnWSxcbiAgICAgIGRyb3BSZXN1bHQsXG4gICAgICBkcm9wTm9kZVxuICAgIH07XG4gIH1cbn1cbiJdfQ==