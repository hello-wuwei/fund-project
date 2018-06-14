/**
 * Created by Administrator on 2018/5/31.
 */
let defaultConf = {
  spellcheck: true,
  toolbar: [
    'removeFormat', 'undo', 'redo', '|', 'element', 'fontName', 'fontSize', 'foreColor', 'backColor', 'divider', 'bold', 'italic', 'underline', 'strikeThrough',
    'link', 'unLink', 'divider', 'subscript', 'superscript', 'divider', 'justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull',
    '|', 'indent', 'outdent', 'insertOrderedList', 'insertUnorderedList', '|', 'picture', 'table', '|', 'code', 'fullscreen', 'sourceCode', 'markdown'
  ],
  fontName: [
    { val: 'arial black' },
    { val: 'times new roman' },
    { val: 'Courier New' }
  ],
  fontSize: ['12px', '14px', '16px', '18px', '20px', '24px', '28px', '32px', '36px'],
  code: {
    type: ['bash', 'clike', 'css', 'html', 'java', 'javascript', 'php', 'python', 'sql'],
    pattern: {
      attr: 'class',
      value: 'language-#type#'
    }
  }
}
export default defaultConf
