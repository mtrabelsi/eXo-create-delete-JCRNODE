/**
 * Created by exoplatform on 27/01/15.
 */
(function($){

  var _messageConfirmCBController = function (type,message,containerId) {
    var alertDOM =  $('#'+containerId);
    //var alertDOM =  $('#JuzExoInviteFriendAlertContainer');
    if(type != null && type != "") {
      var icon = type.charAt(0).toUpperCase() + type.slice(1);
      var strIcon = "<i class='uiIcon" + icon + "'></i>";
      alertDOM.removeClass();
      alertDOM.addClass('alert');
      alertDOM.addClass('alert-' + type);
      alertDOM.html(strIcon + message);
      alertDOM.css('visibility', 'visible');
      alertDOM.show();
      setTimeout(function() {
        alertDOM.css("visibility" , "hidden");
        alertDOM.hide();
      }, 5000);
    }
  };

  var _disPlayInfoMsgCB = function(msg,containerId){
    _messageConfirmCBController('info',msg,containerId);
  };

  var _disPlaySuccessMsgCB = function(msg,containerId){
    _messageConfirmCBController('success',msg,containerId);
  };

  var _disPlayWarningMsgCB = function(msg,containerId){
    _messageConfirmCBController('warning',msg,containerId);
  };

  var _disPlayErrorMsgCB = function(msg,containerId){
    _messageConfirmCBController('error',msg,containerId);
  };

/*
  function _validateEmail(email){
    var regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i;
    if (email.length === 0 || !regex.test(email)) {
      _disPlayErrorMsgCB("Please enter a valid email address.");
      return false;
    }
    return true;
  }; */

  function _nodeAction(action,containerId,nodeName){
    _disPlayInfoMsgCB('processing ... ',containerId);
    if(action=="create")
     $.ajax({url: "/portal/rest/nodes/addNode/"+nodeName, success: function(data){
               if(data != 'nok'){
                     _disPlaySuccessMsgCB(data, containerId);
                     // _storeInvitation(nodeName);
                     }else{
                       _disPlayErrorMsgCB("Something went wrong, cannot send invitation",containerId);
                     }
          }});
    if(action=="delete")
     $.ajax({url: "/portal/rest/nodes/removeNode/"+nodeName, success: function(data){
               if(data != 'nok'){
                     _disPlayInfoMsgCB(data, containerId);
                     // _storeInvitation(nodeName);
                     }else{
                       _disPlayErrorMsgCB("Something went wrong, cannot send invitation",containerId);
                     }
          }});
/*
    $('.jz').jzAjax('JuZExoInviteFriendFrontendApplication.createNode()',{
      data:{email:nodeName},
      success:function(data){
      alert(JSON.stringify(data));
        if(data != 'nok'){
          var obj = $.parseJSON(data);

            _disPlaySuccessMsgCB(obj.msg, containerId);
            // _storeInvitation(nodeName);

        }else{
          _disPlayErrorMsgCB("Something went wrong, cannot send invitation",containerId);
        }
      }
    });
*/



  };

  function _storeInvitation(email){
     $('.jz').jzAjax('JuZExoInviteFriendFrontendApplication.storeInvitation()',{
      data:{email:email},
      success:function(data){
        if(data == 'ok'){
//          _disPlaySuccessMsgCB(data);
        }else if(data == 'nok'){
//          _disPlayErrorMsgCB("Something went wrong, cannot remove your account");
        }else{
//          _disPlayInfoMsgCB(data);
        }
      }
    });
  };

  function _saveEditMode(enableStoreData){
    $('.jz').jzAjax('JuZExoInviteFriendFrontendApplication.saveEditMode()',{
      data:{enableStoreData:enableStoreData},
      success:function(data){
        if(data == 'ok')
          alert('settings saved');
      }
    });
  }

  $(document).ready(function() {


    $(document).on('click.exo-create-node','button#exo-create-node',function() {
      var nodeName = $("#exo-create-node-nodeName").val();

      //if(_validateEmail(nodeName))
      _nodeAction('create','juzExoCreateNodeAlertContainer',nodeName);
    });

    $(document).on('click.exo-delete-node','button#exo-delete-node',function() {
      var nodeName = $("#exo-delete-node-nodeName").val();

      //if(_validateEmail(nodeName))
      _nodeAction('delete','juzExoDeleteNodeAlertContainer',nodeName);
    });

  });

})($);