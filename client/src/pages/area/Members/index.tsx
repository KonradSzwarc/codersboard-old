import React, { useState } from 'react';
import { List, Typography, Modal, message } from 'antd';

import useHasMainPermission from 'hooks/useHasMainPermission';
import useHasAreaPermission from 'hooks/useHasAreaPermission';

import withMembers, { IWithMembers, IMember } from './store/withMembers';
import deleteMember from './store/deleteMember';
import Member from './Member';
import MemberModal from './MemberModal';
import { MembersContainer, Header, AddButton } from './styles';

const { Title } = Typography;

const handleMemberDelete = (member: IMember) => {
  Modal.confirm({
    title: `Czy jesteś pewien, że chcesz usunąć członka ${member.user.fullName} z obszaru?`,
    content: 'Tej operacji nie będziesz mógł cofnąć.',
    okText: 'Tak, usuń',
    okType: 'danger',
    icon: null,
    cancelText: 'Nie, pozostaw',
    onOk: async () => {
      await deleteMember(member.id);
      message.success('Członek został usunięty z obszaru');
    },
  });
};

const Members: React.FC<IProps> = ({ members, membersLoading }) => {
  const [modalData, setModalData] = useState(null);
  const isAdmin = useHasMainPermission(['OWNER', 'ADMIN']);
  const isAreaAdmin = useHasAreaPermission(['OWNER', 'ADMIN']);

  const closeModal = () => setModalData(null);

  return (
    <MembersContainer>
      <Header>
        <Title level={2}>Członkowie obszaru</Title>
        {(isAdmin || isAreaAdmin) && (
          <AddButton type="primary" onClick={() => setModalData({})}>
            Dodaj członka
          </AddButton>
        )}
      </Header>
      <List
        rowKey="id"
        itemLayout="vertical"
        loading={membersLoading}
        dataSource={members}
        renderItem={member => (
          <Member {...member} onEdit={() => setModalData(member)} onDelete={() => handleMemberDelete(member)} />
        )}
      />
      {modalData && <MemberModal modalData={modalData} onClose={closeModal} />}
    </MembersContainer>
  );
};

interface IProps extends IWithMembers {}

export default withMembers(Members);
